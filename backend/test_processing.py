import os
import pytest
import zipfile
import tempfile
import shutil
import json
import time
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import nibabel as nib

from database import Base, get_db, User, Case, Study
from main import app
from processor import process_dicom_zip

# Use a test database
from sqlalchemy.pool import NullPool
SQLALCHEMY_DATABASE_URL = "sqlite:///../data/test_processing_metadata.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, poolclass=NullPool, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, expire_on_commit=False, bind=engine)

@pytest.fixture(scope="module", autouse=True)
def test_db():
    os.makedirs("../data", exist_ok=True)
    test_db_path = "../data/test_processing_metadata.db"
    if os.path.exists(test_db_path):
        try:
            os.remove(test_db_path)
        except Exception:
            pass
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        # Seed test users
        from auth import hash_password
        users = [
            {"username": "admin", "email": "admin@aviothic.ai", "password": "admin123", "role": "admin"},
            {"username": "radiologist", "email": "radiologist@aviothic.ai", "password": "radiologist123", "role": "radiologist"},
            {"username": "hospital", "email": "hospital@aviothic.ai", "password": "hospital123", "role": "hospital"},
            {"username": "patient", "email": "patient@aviothic.ai", "password": "patient123", "role": "patient"}
        ]
        seeded_users = {}
        for u in users:
            hashed = hash_password(u["password"])
            db_user = User(
                username=u["username"],
                email=u["email"],
                hashed_password=hashed,
                role=u["role"],
                is_active=True
            )
            db.add(db_user)
            seeded_users[u["username"]] = db_user
        db.commit()
        
        # Link radiologist to hospital
        hospital = seeded_users["hospital"]
        seeded_users["radiologist"].hospital_id = hospital.id
        seeded_users["patient"].hospital_id = hospital.id
        db.commit()
        
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)
        if os.path.exists("../data/test_processing_metadata.db"):
            try:
                os.remove("../data/test_processing_metadata.db")
            except Exception:
                pass

@pytest.fixture(scope="module")
def client():
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()
            
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

def get_auth_header(client, username, password):
    resp = client.post("/api/auth/login", json={"username": username, "password": password})
    assert resp.status_code == 200
    token = resp.json()["token"]
    return {"Authorization": f"Bearer {token}"}

# --- Tests ---

def test_invalid_zip_upload_rejection(client):
    headers = get_auth_header(client, "radiologist", "radiologist123")
    
    # 1. Create a dummy non-zip file
    files = {"file": ("dummy.txt", b"not a zip file", "application/text")}
    resp = client.post("/api/cases/upload", files=files, headers=headers)
    assert resp.status_code == 400
    assert "Only ZIP archives are supported" in resp.json()["detail"]

def test_invalid_dicom_content_detection(client, test_db):
    headers = get_auth_header(client, "radiologist", "radiologist123")
    
    # Create a zip containing invalid DICOM files
    temp_zip_path = "../data/invalid_test.zip"
    with zipfile.ZipFile(temp_zip_path, "w") as zf:
        zf.writestr("test1.txt", b"not a dicom image")
        zf.writestr("test2.dcm", b"still not a dicom image")
        
    case_id = "test_invalid_case_1"
    new_case = Case(
        id=case_id,
        patient_id="ANON-123",
        patient_name="Anonymized Patient",
        modality="MR",
        status="processing",
        progress=0
    )
    test_db.add(new_case)
    test_db.commit()
    
    # Try processing
    with pytest.raises(ValueError) as excinfo:
        process_dicom_zip(
            case_id=case_id,
            zip_path=temp_zip_path,
            storage_dir="../data/storage",
            db_session=test_db,
            deidentify=True
        )
    assert "No valid DICOM image files found" in str(excinfo.value)
    
    # Verify DB state set to failed
    test_db.refresh(new_case)
    assert new_case.status == "failed"
    assert "No valid DICOM image files found" in new_case.error_message
    
    test_db.close() # Release database locks
    
    if os.path.exists(temp_zip_path):
        os.remove(temp_zip_path)

def test_complete_processing_pipeline(client, test_db):
    test_db.close() # Ensure no active transactions or connections hold locks
    headers = get_auth_header(client, "radiologist", "radiologist123")
    
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    zip_path = os.path.join(base_dir, "data", "samples", "brain_case.zip")
    
    assert os.path.exists(zip_path), f"Sample zip not found at {zip_path}! Run scripts/setup_samples.py first."

    # 1. Upload ZIP file
    with open(zip_path, "rb") as f:
        files = {"file": ("brain_case.zip", f, "application/zip")}
        resp = client.post("/api/cases/upload", files=files, headers=headers)
        
    assert resp.status_code == 200
    case_id = resp.json()["id"]
    
    # 2. Wait for processing to complete by polling progress API (avoids direct db session lock conflicts)
    max_wait = 20
    status_str = "processing"
    progress_val = 0
    for _ in range(max_wait):
        prog_resp = client.get(f"/api/cases/{case_id}/progress", headers=headers)
        assert prog_resp.status_code == 200
        data = prog_resp.json()
        status_str = data["status"]
        progress_val = data["progress"]
        if status_str in ["completed", "failed"]:
            break
        time.sleep(0.5)
        
    assert status_str == "completed", f"Processing failed! Error: {data.get('error_message')}"
    assert progress_val == 100
    
    # 3. Verify Study detection & linking in database (rollback first to get latest updates)
    test_db.rollback()
    case_record = test_db.query(Case).filter(Case.id == case_id).first()
    assert case_record is not None
    assert case_record.status == "completed"
    assert case_record.study_id is not None
    
    study = test_db.query(Study).filter(Study.id == case_record.study_id).first()
    assert study is not None
    assert study.study_uid == "1.2.826.0.1.3680043.8.498.8473787147862477177555989174171148911"
    
    # 4. Verify NIfTI file generation (.nii.gz)
    nifti_local_path = os.path.join("../data/storage", case_id, "volume.nii.gz")
    assert os.path.exists(nifti_local_path), "NIfTI volume file was not created!"
    
    nii_img = nib.load(nifti_local_path)
    assert nii_img.shape == (128, 128, 64)
    # spacing dx, dy, dz spacing:
    assert nii_img.header.get_zooms() == (1.5, 1.5, 2.0)
    
    # 5. Check Progress API
    prog_resp = client.get(f"/api/cases/{case_id}/progress", headers=headers)
    assert prog_resp.status_code == 200
    assert prog_resp.json()["status"] == "completed"
    assert prog_resp.json()["progress"] == 100

    # 6. Check volume manifest download
    manifest_resp = client.get(f"/api/cases/{case_id}/volume", headers=headers)
    assert manifest_resp.status_code == 200
    assert manifest_resp.json()["width"] == 128
    assert manifest_resp.json()["height"] == 128
    assert manifest_resp.json()["depth"] == 64

    # 7. Check raw bin volume download
    raw_resp = client.get(f"/api/cases/{case_id}/volume/raw", headers=headers)
    assert raw_resp.status_code == 200
    assert len(raw_resp.content) == 128 * 128 * 64 * 2 # 16-bit integers

    # 8. Check NIfTI file download
    nii_resp = client.get(f"/api/cases/{case_id}/nifti", headers=headers)
    assert nii_resp.status_code == 200
    assert nii_resp.headers["content-type"] == "application/gzip"
    
    # Cleanup storage directory for this case
    shutil.rmtree(os.path.join("../data/storage", case_id), ignore_errors=True)
