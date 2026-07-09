import os
import zipfile
import tempfile
import shutil
import json
import numpy as np
import pydicom
import nibabel as nib
from pydicom.errors import InvalidDicomError
from database import Case, User, Study
from storage import storage_manager

def clean_phi(ds):
    """
    De-identify standard PHI tags in the DICOM dataset.
    """
    # 1. Patient Identity
    if "PatientName" in ds:
        ds.PatientName = "Anonymized^Patient"
    if "PatientID" in ds:
        ds.PatientID = "ANON-" + ds.PatientID[-6:] if len(ds.PatientID) > 6 else "ANON-99999"
    
    # 2. Patient Dates & Times
    if "PatientBirthDate" in ds:
        ds.PatientBirthDate = ""
    if "PatientBirthTime" in ds:
        ds.PatientBirthTime = ""
    if "PatientSex" in ds:
        ds.PatientSex = "O"
    if "PatientAge" in ds:
        ds.PatientAge = ""

    # 3. Demographics and Contact Info
    if "PatientAddress" in ds:
        ds.PatientAddress = ""
    if "PatientTelephoneNumbers" in ds:
        ds.PatientTelephoneNumbers = ""
        
    # 4. Institutional & Staff Info
    if "InstitutionName" in ds:
        ds.InstitutionName = "Anonymized Institution"
    if "InstitutionAddress" in ds:
        ds.InstitutionAddress = ""
    if "InstitutionalDepartmentName" in ds:
        ds.InstitutionalDepartmentName = ""
    if "ReferringPhysicianName" in ds:
        ds.ReferringPhysicianName = "Anonymized Doctor"
    if "ReferringPhysicianAddress" in ds:
        ds.ReferringPhysicianAddress = ""
    if "ReferringPhysicianTelephoneNumbers" in ds:
        ds.ReferringPhysicianTelephoneNumbers = ""
    if "PerformingPhysicianName" in ds:
        ds.PerformingPhysicianName = "Anonymized Doctor"
    if "PhysicianOfRecord" in ds:
        ds.PhysicianOfRecord = "Anonymized Doctor"
    if "OperatorName" in ds:
        ds.OperatorName = "Anonymized Operator"

    # 5. Diagnostic / Record IDs
    if "AdmittingDiagnosesDescription" in ds:
        ds.AdmittingDiagnosesDescription = ""
    if "OtherPatientIDs" in ds:
        ds.OtherPatientIDs = []
    if "OtherPatientNames" in ds:
        ds.OtherPatientNames = []
    if "MedicalRecordLocator" in ds:
        ds.MedicalRecordLocator = ""
    if "EthnicGroup" in ds:
        ds.EthnicGroup = ""
    if "Occupation" in ds:
        ds.Occupation = ""
    if "AdditionalPatientHistory" in ds:
        ds.AdditionalPatientHistory = ""
    if "PatientComments" in ds:
        ds.PatientComments = ""
    if "DeviceSerialNumber" in ds:
        ds.DeviceSerialNumber = ""
        
    return ds

def process_dicom_zip(
    case_id: str,
    zip_path: str,
    storage_dir: str,
    db_session,
    deidentify=True,
    progress_callback=None
):
    temp_dir = tempfile.mkdtemp()
    case_storage_dir = os.path.join(storage_dir, case_id)
    os.makedirs(case_storage_dir, exist_ok=True)

    def report_progress(percent: int, message: str):
        if progress_callback:
            progress_callback(percent, message)
        else:
            # Fallback if no callback (e.g. running via BackgroundTasks)
            try:
                case_record = db_session.query(Case).filter(Case.id == case_id).first()
                if case_record:
                    case_record.progress = percent
                    if percent == 100:
                        case_record.status = "completed"
                        case_record.error_message = None
                    db_session.commit()
            except Exception as e:
                print(f"Failed to update progress in db: {e}")

    try:
        report_progress(5, "Extracting ZIP archive...")
        # 1. Extract ZIP
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        report_progress(15, "ZIP archive extracted. Validating DICOM files...")

        # 2. Gather & Validate DICOM files
        dicom_files = []
        for root, _, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    # Validate if it is a valid DICOM file by reading its preamble
                    with open(file_path, "rb") as f:
                        preamble = f.read(132)
                        # Standard DICOM files have 'DICM' at byte 128
                        if len(preamble) >= 132 and preamble[128:132] == b"DICM":
                            pass
                        # Allow files without preamble if pydicom can parse it (e.g., raw transfer syntax)
                    
                    ds = pydicom.dcmread(file_path, stop_before_pixels=True)
                    if "Rows" in ds and "Columns" in ds:
                        dicom_files.append((file_path, ds))
                except (InvalidDicomError, PermissionError):
                    continue

        if not dicom_files:
            raise ValueError("No valid DICOM image files found in the archive.")

        report_progress(30, "Grouping files by Study and Series...")

        # 3. Study and Series detection
        # Group slices by Study Instance UID and Series Instance UID
        study_groups = {}
        for path, ds in dicom_files:
            study_uid = getattr(ds, "StudyInstanceUID", "UNKNOWN_STUDY")
            series_uid = getattr(ds, "SeriesInstanceUID", "UNKNOWN_SERIES")
            
            if study_uid not in study_groups:
                study_groups[study_uid] = {}
            if series_uid not in study_groups[study_uid]:
                study_groups[study_uid][series_uid] = []
            
            study_groups[study_uid][series_uid].append((path, ds))

        # Select primary study (one with most slices)
        primary_study_uid = max(study_groups.keys(), key=lambda sk: sum(len(study_groups[sk][sek]) for sek in study_groups[sk]))
        primary_study_series = study_groups[primary_study_uid]

        # Select primary series within that study (one with most slices)
        primary_series_uid = max(primary_study_series.keys(), key=lambda sk: len(primary_study_series[sk]))
        primary_slices = primary_study_series[primary_series_uid]

        print(f"Selected study {primary_study_uid} and primary series {primary_series_uid} with {len(primary_slices)} slices.")

        # Check for duplicate uploads (matching series_uid) within the last 5 minutes
        import datetime
        time_threshold = datetime.datetime.utcnow() - datetime.timedelta(minutes=5)
        existing_duplicate = db_session.query(Case).filter(
            Case.series_uid == primary_series_uid,
            Case.id != case_id,
            Case.created_at >= time_threshold
        ).first()
        if existing_duplicate:
            raise ValueError(f"Duplicate upload detected: Series {primary_series_uid} was already uploaded recently (Case ID: {existing_duplicate.id}).")

        # Count previous completed cases with same series_uid to version it
        series_count = db_session.query(Case).filter(
            Case.series_uid == primary_series_uid,
            Case.id != case_id,
            Case.status == "completed"
        ).count()

        report_progress(40, "Creating/updating Study record...")

        # Read first slice for study metadata
        first_slice_path, first_slice_meta = primary_slices[0]
        first_ds = pydicom.dcmread(first_slice_path)
        study_desc = getattr(first_slice_meta, "StudyDescription", "Study Reconstructed from Upload")
        study_date_str = getattr(first_slice_meta, "StudyDate", "")

        # Fetch case details for links
        case_record = db_session.query(Case).filter(Case.id == case_id).first()
        hosp_id = case_record.hospital_id if case_record else None
        pat_id = case_record.patient_id if case_record else None

        # Check if Study already exists
        study_record = db_session.query(Study).filter(Study.study_uid == primary_study_uid).first()
        if not study_record:
            study_record = Study(
                study_uid=primary_study_uid,
                description=study_desc,
                study_date=study_date_str,
                patient_id=pat_id,
                hospital_id=hosp_id
            )
            db_session.add(study_record)
            db_session.commit()
            db_session.refresh(study_record)

        if case_record:
            case_record.study_id = study_record.id
            db_session.commit()

        report_progress(50, "Spatially sorting slices...")

        # 4. Spatially sort slices
        full_slices = []
        for path, ds_meta in primary_slices:
            ds = pydicom.dcmread(path)
            if deidentify:
                ds = clean_phi(ds)
            full_slices.append(ds)

        # Image orientation for projection
        orientation = getattr(full_slices[0], "ImageOrientationPatient", [1, 0, 0, 0, 1, 0])
        row_cosine = np.array(orientation[:3])
        col_cosine = np.array(orientation[3:])
        slice_normal = np.cross(row_cosine, col_cosine)

        sorted_slices = []
        for ds in full_slices:
            pos = getattr(ds, "ImagePositionPatient", [0, 0, 0])
            z_proj = np.dot(np.array(pos), slice_normal)
            sorted_slices.append((z_proj, ds))

        sorted_slices.sort(key=lambda x: x[0])
        
        # 5. Dimensions & Spacing
        first_ds = sorted_slices[0][1]
        rows = int(first_ds.Rows)
        cols = int(first_ds.Columns)
        depth = len(sorted_slices)

        pixel_spacing = getattr(first_ds, "PixelSpacing", getattr(first_ds, "ImagerPixelSpacing", [1.0, 1.0]))
        dx = float(pixel_spacing[0])
        dy = float(pixel_spacing[1])

        if depth > 1:
            z_coords = [s[0] for s in sorted_slices]
            dz = float(np.median(np.diff(z_coords)))
            if dz == 0.0:
                dz = float(getattr(first_ds, "SliceThickness", 1.0))
        else:
            dz = float(getattr(first_ds, "SliceThickness", 1.0))

        report_progress(60, "Reconstructing 3D Volume...")

        # 6. Reconstruct volume
        volume = np.zeros((depth, rows, cols), dtype=np.int16)
        for z_idx, (_, ds) in enumerate(sorted_slices):
            pixel_array = ds.pixel_array.astype(np.float32)
            slope = float(getattr(ds, "RescaleSlope", 1.0))
            intercept = float(getattr(ds, "RescaleIntercept", 0.0))
            if slope != 1.0 or intercept != 0.0:
                pixel_array = pixel_array * slope + intercept
            volume[z_idx] = pixel_array.astype(np.int16)

        window_center = float(getattr(first_ds, "WindowCenter", 400.0))
        window_width = float(getattr(first_ds, "WindowWidth", 800.0))

        if isinstance(window_center, pydicom.multival.MultiValue):
            window_center = float(window_center[0])
        if isinstance(window_width, pydicom.multival.MultiValue):
            window_width = float(window_width[0])

        min_val = float(np.min(volume))
        max_val = float(np.max(volume))

        report_progress(70, "Saving binary volume files locally...")

        # 7. Write binary volume data (.bin)
        volume_bytes_path = os.path.join(case_storage_dir, "volume.bin")
        with open(volume_bytes_path, "wb") as f:
            f.write(volume.tobytes())

        # 8. Save Metadata JSON descriptor
        metadata = {
            "case_id": case_id,
            "patient_id": str(getattr(first_ds, "PatientID", "ANON-ID")),
            "patient_name": (
                str(getattr(first_ds, "PatientName", "Anonymized Patient")) + f" (v{series_count + 1})"
                if series_count > 0 else str(getattr(first_ds, "PatientName", "Anonymized Patient"))
            ),
            "patient_birth_date": str(getattr(first_ds, "PatientBirthDate", "")),
            "patient_sex": str(getattr(first_ds, "PatientSex", "O")),
            "modality": str(getattr(first_ds, "Modality", "MR")),
            "study_uid": str(getattr(first_ds, "StudyInstanceUID", "")),
            "series_uid": str(primary_series_uid),
            "width": cols,
            "height": rows,
            "depth": depth,
            "dx": dx,
            "dy": dy,
            "dz": dz,
            "window_center": window_center,
            "window_width": window_width,
            "min_intensity": min_val,
            "max_intensity": max_val
        }

        metadata_path = os.path.join(case_storage_dir, "volume.json")
        with open(metadata_path, "w") as f:
            json.dump(metadata, f, indent=2)

        report_progress(80, "Converting volume to NIfTI format...")

        # 9. Convert volume to NIfTI (.nii.gz)
        # Nibabel expects shape in (x, y, z) / (cols, rows, depth)
        # We transpose volume from (depth, rows, cols) (z, y, x) -> (cols, rows, depth) (x, y, z)
        # We use a simple spacing diagonal affine matrix
        affine = np.diag([dx, dy, dz, 1.0])
        nii_volume = volume.transpose(2, 1, 0)
        nii_img = nib.Nifti1Image(nii_volume, affine)
        nifti_path = os.path.join(case_storage_dir, "volume.nii.gz")
        nib.save(nii_img, nifti_path)

        report_progress(90, "Uploading files to S3/MinIO cloud storage...")

        # 10. Upload files via storage manager and verify upload success
        if not storage_manager.upload_file(metadata_path, f"cases/{case_id}/volume.json"):
            raise IOError("Storage save failed for volume.json manifest.")
        if not storage_manager.upload_file(volume_bytes_path, f"cases/{case_id}/volume.bin"):
            raise IOError("Storage save failed for volume.bin voxel data.")
        if not storage_manager.upload_file(nifti_path, f"cases/{case_id}/volume.nii.gz"):
            raise IOError("Storage save failed for volume.nii.gz NIfTI volume.")

        # 11. Update Case database entry
        case_record = db_session.query(Case).filter(Case.id == case_id).first()
        if case_record:
            user_exists = False
            if case_record.patient_id:
                user_exists = db_session.query(User).filter(User.id == case_record.patient_id).count() > 0
            if not user_exists:
                case_record.patient_id = metadata["patient_id"]
            if not case_record.patient_name or case_record.patient_name == "Processing...":
                case_record.patient_name = metadata["patient_name"]
            case_record.patient_birth_date = metadata["patient_birth_date"]
            case_record.patient_sex = metadata["patient_sex"]
            case_record.modality = metadata["modality"]
            case_record.study_uid = metadata["study_uid"]
            case_record.series_uid = metadata["series_uid"]
            case_record.slice_count = depth
            
            case_record.width = cols
            case_record.height = rows
            case_record.depth = depth
            case_record.dx = dx
            case_record.dy = dy
            case_record.dz = dz
            case_record.window_center = window_center
            case_record.window_width = window_width
            
            # Save NIfTI relative S3 key/path
            case_record.nifti_path = f"cases/{case_id}/volume.nii.gz"
            case_record.error_message = None
            
            db_session.commit()

        report_progress(100, "Processing completed successfully.")
        print(f"Case {case_id} processed successfully: {cols}x{rows}x{depth}")

    except Exception as e:
        db_session.rollback()
        case_record = db_session.query(Case).filter(Case.id == case_id).first()
        if case_record:
            case_record.status = "failed"
            case_record.error_message = str(e)
            case_record.progress = 0
            db_session.commit()
        print(f"Error processing case {case_id}: {str(e)}")
        raise e
        
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
