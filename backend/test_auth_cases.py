import os
import pytest
import datetime
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base, get_db, User, Case, Study, AuditLog, RefreshToken
from main import app
from auth import hash_password

# Use a test database
from sqlalchemy.pool import NullPool
SQLALCHEMY_DATABASE_URL = "sqlite:///../data/test_metadata.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, poolclass=NullPool, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, expire_on_commit=False, bind=engine)

@pytest.fixture(scope="module", autouse=True)
def test_db():
    # Make sure data directory exists
    os.makedirs("../data", exist_ok=True)
    test_db_path = "../data/test_metadata.db"
    if os.path.exists(test_db_path):
        try:
            os.remove(test_db_path)
        except Exception:
            pass
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        # Seed test users
        users = [
            {"username": "admin", "email": "admin@aviothic.ai", "password": "admin123", "role": "admin"},
            {"username": "doctor", "email": "doctor@aviothic.ai", "password": "doctor123", "role": "doctor"},
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
        
        # Link doctor, radiologist, patient to the hospital
        hospital = seeded_users["hospital"]
        seeded_users["doctor"].hospital_id = hospital.id
        seeded_users["radiologist"].hospital_id = hospital.id
        seeded_users["patient"].hospital_id = hospital.id
        db.commit()
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)
        if os.path.exists("../data/test_metadata.db"):
            try:
                os.remove("../data/test_metadata.db")
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


# Helper to get auth header
def get_auth_header(client, username, password):
    resp = client.post("/api/auth/login", json={"username": username, "password": password})
    assert resp.status_code == 200, f"Failed to login {username}: {resp.json()}"
    token = resp.json()["token"]
    refresh_token = resp.json()["refresh_token"]
    return {"Authorization": f"Bearer {token}"}, refresh_token


# --- Tests ---

def test_login_success(client):
    resp = client.post("/api/auth/login", json={"username": "admin", "password": "admin123"})
    assert resp.status_code == 200
    data = resp.json()
    assert "token" in data
    assert "refresh_token" in data
    assert data["username"] == "admin"
    assert data["role"] == "admin"

def test_login_invalid_credentials(client):
    resp = client.post("/api/auth/login", json={"username": "admin", "password": "wrongpassword"})
    assert resp.status_code == 401
    assert "detail" in resp.json()

def test_token_refresh(client):
    # 1. Login to get refresh token
    headers, ref_token = get_auth_header(client, "doctor", "doctor123")
    
    # 2. Refresh token
    resp = client.post("/api/auth/refresh", json={"refresh_token": ref_token})
    assert resp.status_code == 200
    data = resp.json()
    assert "token" in data
    assert "refresh_token" in data
    new_token = data["token"]
    new_ref_token = data["refresh_token"]
    
    # Verify that the old refresh token was revoked and cannot be reused
    resp_reused = client.post("/api/auth/refresh", json={"refresh_token": ref_token})
    assert resp_reused.status_code == 401
    
    # Logout/Revoke the new refresh token
    logout_resp = client.post("/api/auth/logout", json={"refresh_token": new_ref_token})
    assert logout_resp.status_code == 200

def test_register_user(client):
    # Register a new user
    resp = client.post("/api/auth/register", json={
        "username": "new_doc",
        "email": "new_doc@aviothic.ai",
        "password": "docpassword",
        "role": "doctor"
    })
    assert resp.status_code == 201
    data = resp.json()
    assert data["username"] == "new_doc"
    assert data["role"] == "doctor"
    
    # Verify can login
    login_resp = client.post("/api/auth/login", json={"username": "new_doc", "password": "docpassword"})
    assert login_resp.status_code == 200

def test_protected_routes_without_auth(client):
    resp = client.get("/api/cases")
    assert resp.status_code == 401

def test_user_me(client):
    headers, _ = get_auth_header(client, "radiologist", "radiologist123")
    resp = client.get("/api/auth/me", headers=headers)
    assert resp.status_code == 200
    assert resp.json()["username"] == "radiologist"
    assert resp.json()["role"] == "radiologist"

def test_study_crud_and_rbac(client, test_db):
    admin_headers, _ = get_auth_header(client, "admin", "admin123")
    rad_headers, _ = get_auth_header(client, "radiologist", "radiologist123")
    pat_headers, _ = get_auth_header(client, "patient", "patient123")
    doc_headers, _ = get_auth_header(client, "doctor", "doctor123")
    hosp_headers, _ = get_auth_header(client, "hospital", "hospital123")

    # 1. Create Patient User for link
    patient_user = test_db.query(User).filter(User.username == "patient").first()
    hospital_user = test_db.query(User).filter(User.username == "hospital").first()
    doctor_user = test_db.query(User).filter(User.username == "doctor").first()
    
    # 2. Radiologist creates a study
    study_data = {
        "study_uid": "1.2.840.10008.5.1.4.1.1.7",
        "description": "Brain MRI",
        "study_date": "20260705",
        "patient_id": patient_user.id,
        "hospital_id": hospital_user.id
    }
    study_resp = client.post("/api/studies", json=study_data, headers=rad_headers)
    assert study_resp.status_code == 201
    study_id = study_resp.json()["id"]

    # 3. Patient tries to create a study -> Forbidden
    bad_study = client.post("/api/studies", json=study_data, headers=pat_headers)
    assert bad_study.status_code == 403

    # 4. List studies - Admin lists
    list_resp = client.get("/api/studies", headers=admin_headers)
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 1

    # 5. List studies - Patient lists
    pat_list = client.get("/api/studies", headers=pat_headers)
    assert pat_list.status_code == 200
    assert len(pat_list.json()) == 1
    assert pat_list.json()[0]["id"] == study_id

    # 6. Update study - Radiologist updates description
    update_resp = client.put(f"/api/studies/{study_id}", json={"description": "Brain MRI Contrast"}, headers=rad_headers)
    assert update_resp.status_code == 200
    assert update_resp.json()["description"] == "Brain MRI Contrast"

    # 7. Delete study - Radiologist tries -> Forbidden
    del_rad = client.delete(f"/api/studies/{study_id}", headers=rad_headers)
    assert del_rad.status_code == 403

    # 8. Delete study - Admin deletes -> Success
    del_admin = client.delete(f"/api/studies/{study_id}", headers=admin_headers)
    assert del_admin.status_code == 200

def test_case_crud_and_rbac(client, test_db):
    admin_headers, _ = get_auth_header(client, "admin", "admin123")
    rad_headers, _ = get_auth_header(client, "radiologist", "radiologist123")
    pat_headers, _ = get_auth_header(client, "patient", "patient123")
    doc_headers, _ = get_auth_header(client, "doctor", "doctor123")
    hosp_headers, _ = get_auth_header(client, "hospital", "hospital123")
    
    patient_user = test_db.query(User).filter(User.username == "patient").first()
    doctor_user = test_db.query(User).filter(User.username == "doctor").first()
    hospital_user = test_db.query(User).filter(User.username == "hospital").first()
    radiologist_user = test_db.query(User).filter(User.username == "radiologist").first()

    # Link radiologist to hospital
    radiologist_user.hospital_id = hospital_user.id
    test_db.commit()

    # 1. Create a Case
    # Normally, cases are uploaded via zip. But we can insert one or check API upload.
    # Let's create a Case record in the DB and assign it.
    test_case = Case(
        id="case_test_123",
        patient_id=patient_user.id,
        patient_name="John Doe",
        modality="MR",
        study_uid="1.2.3",
        series_uid="4.5.6",
        slice_count=10,
        status="completed",
        doctor_id=doctor_user.id,
        radiologist_id=radiologist_user.id,
        hospital_id=hospital_user.id
    )
    test_db.add(test_case)
    test_db.commit()

    # 2. Doctor gets the case -> Success
    case_resp = client.get(f"/api/cases/{test_case.id}", headers=doc_headers)
    assert case_resp.status_code == 200
    assert case_resp.json()["patient_name"] == "John Doe"

    # 3. Patient gets the case -> Success
    case_pat_resp = client.get(f"/api/cases/{test_case.id}", headers=pat_headers)
    assert case_pat_resp.status_code == 200

    # 4. Another register doctor who is not assigned gets the case -> Forbidden
    client.post("/api/auth/register", json={
        "username": "other_doc",
        "email": "other_doc@aviothic.ai",
        "password": "docpassword",
        "role": "doctor"
    })
    other_headers, _ = get_auth_header(client, "other_doc", "docpassword")
    case_other_resp = client.get(f"/api/cases/{test_case.id}", headers=other_headers)
    assert case_other_resp.status_code == 403

    # 5. Doctor saves annotation -> Success
    ann_data = {
        "id": "ann_1",
        "type": "marker",
        "label": "Lesion",
        "data": {"x": 10, "y": 20, "z": 5}
    }
    ann_resp = client.post(f"/api/cases/{test_case.id}/annotations", json=ann_data, headers=doc_headers)
    assert ann_resp.status_code == 200
    assert ann_resp.json()["label"] == "Lesion"

    # 6. Patient tries to save annotation -> Forbidden
    ann_pat = client.post(f"/api/cases/{test_case.id}/annotations", json=ann_data, headers=pat_headers)
    assert ann_pat.status_code == 403

    # 7. Doctor deletes annotation -> Success
    del_ann = client.delete(f"/api/cases/{test_case.id}/annotations/ann_1", headers=doc_headers)
    assert del_ann.status_code == 200

    # 8. Doctor tries to delete case -> Forbidden
    del_case_doc = client.delete(f"/api/cases/{test_case.id}", headers=doc_headers)
    assert del_case_doc.status_code == 403

    # 9. Hospital deletes case -> Success
    del_case_hosp = client.delete(f"/api/cases/{test_case.id}", headers=hosp_headers)
    assert del_case_hosp.status_code == 200

def test_audit_logs(client):
    admin_headers, _ = get_auth_header(client, "admin", "admin123")
    doc_headers, _ = get_auth_header(client, "doctor", "doctor123")

    # Admin list audit logs -> Success
    audit_resp = client.get("/api/audit-logs", headers=admin_headers)
    assert audit_resp.status_code == 200
    logs = audit_resp.json()
    assert len(logs) > 0
    # verify some fields
    assert "action" in logs[0]
    assert "timestamp" in logs[0]

    # Doctor list audit logs -> Forbidden
    audit_doc = client.get("/api/audit-logs", headers=doc_headers)
    assert audit_doc.status_code == 403
