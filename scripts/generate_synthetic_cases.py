import os
import zipfile
import numpy as np
import pydicom
from pydicom.dataset import Dataset, FileDataset
from pydicom.uid import generate_uid

def create_phantom_slice(volume_type, x_grid, y_grid, z_val, depth):
    """
    Generates a 2D slice at a specific depth (z_val) for a 3D phantom.
    All dimensions normalized to -1.0 to 1.0.
    """
    # Grid coordinates
    x = x_grid
    y = y_grid
    z = z_val

    # Initialize empty slice
    img = np.zeros(x.shape, dtype=np.uint16)

    # Base background noise
    noise = np.random.normal(10, 2, x.shape).astype(np.float32)
    img = np.clip(img + noise, 0, 4095).astype(np.uint16)

    if volume_type == "brain":
        # 1. Skull outer (large ellipsoid)
        r_skull_out = (x**2 / 0.8**2) + (y**2 / 0.7**2) + (z**2 / 0.8**2)
        # 2. Skull inner
        r_skull_in = (x**2 / 0.76**2) + (y**2 / 0.66**2) + (z**2 / 0.76**2)
        # 3. Brain parenchyma
        r_brain = (x**2 / 0.72**2) + (y**2 / 0.62**2) + (z**2 / 0.72**2)
        # 4. Ventricles (two small symmetric ellipsoids)
        r_vent1 = ((x - 0.15)**2 / 0.12**2) + ((y + 0.1)**2 / 0.25**2) + (z**2 / 0.2**2)
        r_vent2 = ((x + 0.15)**2 / 0.12**2) + ((y + 0.1)**2 / 0.25**2) + (z**2 / 0.2**2)
        # 5. Tumor (high contrast sphere at an offset)
        r_tumor = ((x - 0.22)**2 / 0.15**2) + ((y - 0.25)**2 / 0.15**2) + ((z - 0.1)**2 / 0.15**2)

        # Set pixel values (CT Hounsfield units shifted to positive range for raw DICOM uint16)
        mask_skull = (r_skull_out <= 1.0) & (r_skull_in > 1.0)
        mask_brain = (r_brain <= 1.0)
        mask_vent = (r_vent1 <= 1.0) | (r_vent2 <= 1.0)
        mask_tumor = (r_tumor <= 1.0)

        # Build layers
        img[mask_brain] = 400  # Gray matter default
        # Add some white matter tracts (inner core)
        r_wm = (x**2 / 0.55**2) + (y**2 / 0.45**2) + (z**2 / 0.55**2)
        img[r_wm <= 1.0] = 320  # White matter
        img[mask_skull] = 1200  # High density bone
        img[mask_vent] = 50     # Water-like CSF
        img[mask_tumor] = 950   # High contrast lesion

    elif volume_type == "breast":
        # Breast is a hemisphere attached to the chest wall (y = -1.0 is chest wall, projecting towards y = 1.0)
        # 1. Outer skin boundary
        r_breast = (x**2 / 0.75**2) + ((y + 0.8)**2 / 1.5**2) + (z**2 / 0.75**2)
        mask_breast = (r_breast <= 1.0) & (y >= -0.8)
        
        # 2. Skin layer (1.0 to 0.95 relative radius)
        r_breast_in = (x**2 / 0.72**2) + ((y + 0.8)**2 / 1.44**2) + (z**2 / 0.72**2)
        mask_skin = mask_breast & ~( (r_breast_in <= 1.0) & (y >= -0.78) )

        # 3. Glandular tissue core (concentric structure inside)
        r_gland = (x**2 / 0.45**2) + ((y + 0.6)**2 / 0.8**2) + (z**2 / 0.45**2)
        mask_gland = (r_gland <= 1.0) & (y >= -0.6)

        # 4. Spiculated Tumor
        theta = np.arctan2(z, x)
        spicule_mod = 1.0 + 0.15 * np.sin(8 * theta)
        r_tumor = (((x - 0.15)**2 + (y + 0.1)**2 + (z - 0.1)**2) / 0.12**2)
        mask_tumor = (r_tumor <= spicule_mod) & mask_breast

        # Assign values
        img[mask_breast] = 200  # Adipose tissue (fat)
        img[mask_skin] = 500    # Skin
        img[mask_gland] = 450   # Dense glandular tissue
        img[mask_tumor] = 850   # Dense suspicious mass

    return img

def generate_dicom_series(volume_type, output_dir, num_slices=64, size=128):
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate unique IDs for the series
    study_uid = generate_uid()
    series_uid = generate_uid()
    patient_id = "PAT-BRAIN-001" if volume_type == "brain" else "PAT-BREAST-001"
    patient_name = "Phantom^Brain" if volume_type == "brain" else "Phantom^Breast"
    modality = "MR" # Magnetic Resonance

    # Spacing and dimensions
    dx = 1.5  # mm per pixel
    dy = 1.5
    dz = 2.0  # mm slice thickness/spacing
    
    x_coords = np.linspace(-1.0, 1.0, size)
    y_coords = np.linspace(-1.0, 1.0, size)
    x_grid, y_grid = np.meshgrid(x_coords, y_coords)

    print(f"Generating {num_slices} slices for {volume_type} phantom...")

    for i in range(num_slices):
        # Normalized z position from -1.0 to 1.0
        z_val = -1.0 + 2.0 * i / (num_slices - 1)
        # Physical z position in mm
        z_phys = (i - num_slices / 2) * dz

        # Create pixel array
        pixels = create_phantom_slice(volume_type, x_grid, y_grid, z_val, num_slices)

        # File metadata setup
        file_meta = pydicom.dataset.FileMetaDataset()
        file_meta.MediaStorageSOPClassUID = '1.2.840.10008.5.1.4.1.1.4'  # MR Image Storage
        file_meta.MediaStorageSOPInstanceUID = generate_uid()
        file_meta.TransferSyntaxUID = pydicom.uid.ExplicitVRLittleEndian

        filename = os.path.join(output_dir, f"slice_{i:03d}.dcm")
        ds = FileDataset(filename, {}, file_meta=file_meta, preamble=b"\0" * 128)

        # Add Patient / Study info
        ds.PatientName = patient_name
        ds.PatientID = patient_id
        ds.PatientBirthDate = "19700101"
        ds.PatientSex = "O"
        ds.StudyInstanceUID = study_uid
        ds.SeriesInstanceUID = series_uid
        ds.StudyID = "10001"
        ds.SeriesNumber = 1
        ds.InstanceNumber = i + 1
        ds.Modality = modality
        ds.SOPClassUID = file_meta.MediaStorageSOPClassUID
        ds.SOPInstanceUID = file_meta.MediaStorageSOPInstanceUID

        # Add Spatial Geometry
        ds.ImagePositionPatient = [-size*dx/2, -size*dy/2, z_phys]
        ds.ImageOrientationPatient = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0]
        ds.FrameOfReferenceUID = generate_uid()
        ds.SliceThickness = dz
        ds.SpacingBetweenSlices = dz
        ds.PixelSpacing = [dx, dy]

        # Add Image Attributes
        ds.Rows = size
        ds.Columns = size
        ds.BitsAllocated = 16
        ds.BitsStored = 12
        ds.HighBit = 11
        ds.PixelRepresentation = 0  # Unsigned integer
        ds.SamplesPerPixel = 1
        ds.PhotometricInterpretation = "MONOCHROME2"
        ds.RescaleIntercept = 0.0
        ds.RescaleSlope = 1.0

        # Window/Level Presets
        if volume_type == "brain":
            ds.WindowCenter = 450
            ds.WindowWidth = 800
        else:
            ds.WindowCenter = 400
            ds.WindowWidth = 600

        # Assign raw pixel data
        ds.PixelData = pixels.tobytes()

        # Save slice
        ds.save_as(filename)

    print(f"Successfully saved {num_slices} slices to {output_dir}")

def zip_directory(src_dir, output_zip):
    print(f"Creating ZIP archive at {output_zip}...")
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(src_dir):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(file_path, os.path.dirname(src_dir)))
    print("ZIP creation complete.")

if __name__ == "__main__":
    import shutil
    
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    samples_dir = os.path.join(base_dir, "data", "samples")
    os.makedirs(samples_dir, exist_ok=True)

    # 1. Generate Brain MRI Series
    brain_temp_dir = os.path.join(samples_dir, "brain_temp")
    generate_dicom_series("brain", brain_temp_dir, num_slices=64, size=128)
    zip_directory(brain_temp_dir, os.path.join(samples_dir, "brain_case.zip"))
    shutil.rmtree(brain_temp_dir)

    # 2. Generate Breast MRI Series
    breast_temp_dir = os.path.join(samples_dir, "breast_temp")
    generate_dicom_series("breast", breast_temp_dir, num_slices=48, size=128)
    zip_directory(breast_temp_dir, os.path.join(samples_dir, "breast_case.zip"))
    shutil.rmtree(breast_temp_dir)

    print("\nAll synthetic sample cases created successfully!")
