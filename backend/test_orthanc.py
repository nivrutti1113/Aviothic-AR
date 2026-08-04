import os
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from main import app, ORTHANC_URL
from database import get_db, Base, engine, SessionLocal, User, Case
from auth import create_access_token, hash_password
from processor import upload_bytes_to_orthanc, process_dicom_zip

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    # Cleanup

@pytest.fixture
def auth_headers():
    db = SessionLocal()
    user = db.query(User).filter(User.username == "test_orthanc_admin").first()
    if not user:
        user = User(
            id="test-orthanc-user-id",
            username="test_orthanc_admin",
            email="orthanc_admin@aviothic.com",
            hashed_password=hash_password("password123"),
            role="admin",
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    token = create_access_token({"sub": user.username, "role": user.role, "id": user.id})
    db.close()
    return {"Authorization": f"Bearer {token}"}

def test_orthanc_upload_bytes_success():
    with patch("requests.post") as mock_post:
        mock_post.return_value.status_code = 201
        result = upload_bytes_to_orthanc(b"DICOM_DUMMY_DATA", orthanc_url="http://localhost:8042", auth=("orthanc", "secret"))
        assert result is True
        mock_post.assert_called_once()

def test_orthanc_upload_bytes_failure():
    with patch("requests.post") as mock_post:
        mock_post.side_effect = Exception("Connection refused")
        result = upload_bytes_to_orthanc(b"DICOM_DUMMY_DATA", orthanc_url="http://localhost:8042", auth=("orthanc", "secret"))
        assert result is False

def test_orthanc_status_endpoint(auth_headers):
    with patch("requests.get") as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {"Version": "1.12.0"}
        
        response = client.get("/api/orthanc/status", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert data["system_info"]["Version"] == "1.12.0"

def test_orthanc_proxy_unauthorized():
    response = client.get("/api/orthanc-proxy/dicom-web/studies")
    assert response.status_code == 401

def test_orthanc_proxy_authorized_and_csp(auth_headers):
    with patch("requests.request") as mock_req:
        mock_req.return_value.status_code = 200
        mock_req.return_value.content = b'{"studies": []}'
        mock_req.return_value.headers = {"content-type": "application/json"}
        
        response = client.get("/api/orthanc-proxy/dicom-web/studies", headers=auth_headers)
        assert response.status_code == 200
        # Check framing CSP security header
        assert "Content-Security-Policy" in response.headers
        assert "frame-ancestors" in response.headers["Content-Security-Policy"]
        # Confirm invalid X-Frame-Options header is stripped entirely
        assert "x-frame-options" not in response.headers

def test_orthanc_proxy_cross_origin_auth(auth_headers):
    with patch("requests.request") as mock_req:
        mock_req.return_value.status_code = 200
        mock_req.return_value.content = b'{"studies": []}'
        mock_req.return_value.headers = {"content-type": "application/json"}
        
        # Simulate cross-origin request from OHIF origin (http://localhost:3000)
        req_headers = auth_headers.copy()
        req_headers["Origin"] = "http://localhost:3000"
        
        response = client.get("/api/orthanc-proxy/dicom-web/studies", headers=req_headers)
        assert response.status_code == 200
        # Verify cross-origin credentialed CORS headers (origin match, NOT wildcard *)
        assert response.headers.get("Access-Control-Allow-Origin") == "http://localhost:3000"
        assert response.headers.get("Access-Control-Allow-Credentials") == "true"

def test_case_orthanc_study_endpoint(auth_headers):
    db = SessionLocal()
    case = db.query(Case).filter(Case.id == "orthanc-case-1").first()
    if not case:
        case = Case(
            id="orthanc-case-1",
            patient_id="PAT-1001",
            patient_name="Test Patient",
            modality="MR",
            study_uid="1.2.840.113619.2.1.1001",
            series_uid="1.2.840.113619.2.1.1001.1",
            slice_count=10,
            status="completed"
        )
        db.add(case)
        db.commit()
    db.close()

    response = client.get("/api/cases/orthanc-case-1/orthanc-study", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["study_uid"] == "1.2.840.113619.2.1.1001"
    assert data["orthanc_dicomweb_root"] == "/api/orthanc-proxy/dicom-web"
