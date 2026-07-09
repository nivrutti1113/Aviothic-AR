import os
import pytest
import datetime
import time
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from database import Base, get_db, User, Case
from main import app

# Use a specific test database
SQLALCHEMY_DATABASE_URL = "sqlite:///../data/test_e2e_metadata.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, poolclass=NullPool, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, expire_on_commit=False, bind=engine)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    os.makedirs("../data", exist_ok=True)
    test_db_path = "../data/test_e2e_metadata.db"
    if os.path.exists(test_db_path):
        try:
            os.remove(test_db_path)
        except Exception:
            pass
    Base.metadata.create_all(bind=engine)
    yield
    # Cleanup after test
    if os.path.exists(test_db_path):
        try:
            os.remove(test_db_path)
        except Exception:
            pass

@pytest.fixture
def db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_end_to_end_pacs_pipeline(db):
    # Override get_db dependency
    def override_get_db():
        try:
            yield db
        finally:
            pass
    app.dependency_overrides[get_db] = override_get_db

    client = TestClient(app)

    # 1. Register a new user
    reg_res = client.post("/api/auth/register", json={
        "username": "e2eradio",
        "email": "e2eradio@aviothic.ai",
        "password": "clinical123",
        "role": "radiologist"
    })
    assert reg_res.status_code == 201
    
    # 2. Login to retrieve JWT
    login_res = client.post("/api/auth/login", json={
        "username": "e2eradio",
        "password": "clinical123"
    })
    assert login_res.status_code == 200
    token_data = login_res.json()
    token = token_data["token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Verify that get_me works with this token
    me_res = client.get("/api/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["username"] == "e2eradio"

    # 3. Upload DICOM ZIP file
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    zip_path = os.path.join(base_dir, "data", "samples", "brain_case.zip")
    assert os.path.exists(zip_path), f"Sample brain zip not found at {zip_path}"

    with open(zip_path, "rb") as f:
        upload_res = client.post(
            "/api/cases/upload",
            headers=headers,
            files={"file": ("brain_case.zip", f, "application/zip")},
            data={"deidentify": "true"}
        )
    
    assert upload_res.status_code == 200
    case_data = upload_res.json()
    case_id = case_data["id"]
    assert case_id is not None
    assert case_data["status"] == "processing"

    # 4. Poll progress until complete (Timeout after 30s)
    completed = False
    for _ in range(30):
        prog_res = client.get(f"/api/cases/{case_id}/progress", headers=headers)
        assert prog_res.status_code == 200
        prog_data = prog_res.json()
        if prog_data["status"] == "completed":
            completed = True
            break
        elif prog_data["status"] == "failed":
            pytest.fail(f"Volume processing failed: {prog_data['error_message']}")
        time.sleep(1)

    assert completed, "Case processing timed out after 30 seconds."

    # 5. Fetch volume manifest
    manifest_res = client.get(f"/api/cases/{case_id}/volume", headers=headers)
    assert manifest_res.status_code == 200
    manifest = manifest_res.json()
    assert manifest["width"] == 128
    assert manifest["height"] == 128
    assert manifest["depth"] == 64
    assert manifest["patient_name"] == "Anonymized^Patient"

    # 6. Download raw binary voxels
    raw_res = client.get(f"/api/cases/{case_id}/volume/raw", headers=headers)
    assert raw_res.status_code == 200
    raw_bytes = raw_res.content
    # Each voxel is 16-bit (2 bytes), so total size should be 128 * 128 * 64 * 2 = 2,097,152 bytes
    assert len(raw_bytes) == 128 * 128 * 64 * 2

    # 7. Verify duplicate upload REJECTION (within 5 minutes)
    with open(zip_path, "rb") as f:
        dup_res = client.post(
            "/api/cases/upload",
            headers=headers,
            files={"file": ("brain_case.zip", f, "application/zip")},
            data={"deidentify": "true"}
        )
    assert dup_res.status_code == 200
    dup_case_id = dup_res.json()["id"]

    # Poll duplicate case (should fail due to duplicate check within 5 mins)
    dup_failed = False
    for _ in range(15):
        prog_res = client.get(f"/api/cases/{dup_case_id}/progress", headers=headers)
        if prog_res.json()["status"] == "failed":
            assert "Duplicate upload detected" in prog_res.json()["error_message"]
            dup_failed = True
            break
        time.sleep(1)
    assert dup_failed, "Duplicate upload was not rejected within 5-minute window."

    # 8. Verify duplicate versioning (outside 5 minutes)
    # Simulate time elapsed by modifying created_at of the first case to be 10 minutes ago
    case_record = db.query(Case).filter(Case.id == case_id).first()
    case_record.created_at = datetime.datetime.utcnow() - datetime.timedelta(minutes=10)
    db.commit()

    with open(zip_path, "rb") as f:
        version_res = client.post(
            "/api/cases/upload",
            headers=headers,
            files={"file": ("brain_case.zip", f, "application/zip")},
            data={"deidentify": "true"}
        )
    assert version_res.status_code == 200
    ver_case_id = version_res.json()["id"]

    # Poll versioned case (should complete successfully and append v2)
    ver_completed = False
    for _ in range(30):
        prog_res = client.get(f"/api/cases/{ver_case_id}/progress", headers=headers)
        if prog_res.json()["status"] == "completed":
            ver_completed = True
            break
        time.sleep(1)
    assert ver_completed, "Versioned upload failed to complete."

    # Fetch manifest and verify versioned name
    ver_manifest_res = client.get(f"/api/cases/{ver_case_id}/volume", headers=headers)
    assert ver_manifest_res.status_code == 200
    ver_manifest = ver_manifest_res.json()
    assert ver_manifest["patient_name"] == "Anonymized^Patient (v2)"

    # Clean up overrides
    app.dependency_overrides.clear()
