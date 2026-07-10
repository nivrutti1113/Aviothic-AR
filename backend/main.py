import os
import uuid
import shutil
import json
import datetime
from fastapi import FastAPI, UploadFile, File, BackgroundTasks, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import List, Optional

from database import init_db, get_db, SessionLocal, Case, Annotation, User, RefreshToken, Study, AuditLog, Report
from processor import process_dicom_zip
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    get_current_user,
    RequireRole,
    SECRET_KEY,
    ALGORITHM
)
from storage import storage_manager
from celery_app import USE_CELERY, CELERY_BROKER_URL
from tasks import process_dicom_task
import jwt

# Create FastAPI app
app = FastAPI(
    title="3D DICOM Viewer API",
    version="1.0.0",
    description="Secure Medical Imaging (DICOM) viewer API with User & Case Management"
)

# CORS middleware to allow communication from React dev server (e.g. localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(BASE_DIR)
STORAGE_DIR = os.path.join(PARENT_DIR, "data", "storage")
UPLOAD_DIR = os.path.join(PARENT_DIR, "data", "uploads")

os.makedirs(STORAGE_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    init_db()

# Audit Log Helper
def audit_action(db: Session, action: str, details: dict, user_id: Optional[str] = None, request: Optional[Request] = None):
    ip_address = None
    if request:
        ip_address = request.client.host if request.client else None
    
    log_entry = AuditLog(
        user_id=user_id,
        action=action,
        ip_address=ip_address,
        details=json.dumps(details)
    )
    db.add(log_entry)
    db.commit()

# Access Control Helpers
def verify_case_access(case: Case, user: User):
    if user.role == "admin":
        return
    if user.role == "hospital" and case.hospital_id == user.id:
        return
    if user.role == "radiologist":
        if case.radiologist_id == user.id:
            return
        if user.hospital_id and case.hospital_id == user.hospital_id:
            return
    if user.role == "doctor" and case.doctor_id == user.id:
        return
    if user.role == "patient" and case.patient_id == user.id:
        return
    
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Access forbidden: you do not have permission to view/modify this case."
    )

def verify_study_access(db: Session, study: Study, user: User):
    if user.role == "admin":
        return
    if user.role == "hospital" and study.hospital_id == user.id:
        return
    if user.role == "radiologist":
        if user.hospital_id and study.hospital_id == user.hospital_id:
            return
        # Or if they are associated with any case in this study
        has_case = db.query(Case).filter(Case.study_id == study.id, Case.radiologist_id == user.id).first()
        if has_case:
            return
    if user.role == "doctor":
        has_case = db.query(Case).filter(Case.study_id == study.id, Case.doctor_id == user.id).first()
        if has_case:
            return
    if user.role == "patient" and study.patient_id == user.id:
        return
        
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Access forbidden: you do not have permission to access this study."
    )

# --- Pydantic Models ---

class LoginRequest(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    username: str
    role: str
    token: str
    refresh_token: Optional[str] = None

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str  # doctor, radiologist, admin, hospital, patient
    hospital_id: Optional[str] = None

class RegisterResponse(BaseModel):
    id: str
    username: str
    email: str
    role: str
    hospital_id: Optional[str]
    is_active: bool

class TokenRefreshRequest(BaseModel):
    refresh_token: str

class TokenRefreshResponse(BaseModel):
    token: str
    refresh_token: str

class UserProfileOut(BaseModel):
    id: str
    username: str
    email: str
    role: str
    hospital_id: Optional[str]
    is_active: bool
    created_at: datetime.datetime

class StudyCreate(BaseModel):
    study_uid: Optional[str] = None
    description: Optional[str] = None
    study_date: Optional[str] = None
    patient_id: Optional[str] = None
    hospital_id: Optional[str] = None

class StudyUpdate(BaseModel):
    description: Optional[str] = None
    study_date: Optional[str] = None
    patient_id: Optional[str] = None
    hospital_id: Optional[str] = None

class StudyResponse(BaseModel):
    id: str
    study_uid: Optional[str]
    description: Optional[str]
    study_date: Optional[str]
    patient_id: Optional[str]
    hospital_id: Optional[str]
    created_at: datetime.datetime
    updated_at: datetime.datetime
    
    class Config:
        from_attributes = True

class CaseUpdate(BaseModel):
    patient_id: Optional[str] = None
    doctor_id: Optional[str] = None
    radiologist_id: Optional[str] = None
    hospital_id: Optional[str] = None
    study_id: Optional[str] = None
    status: Optional[str] = None

class AnnotationCreate(BaseModel):
    id: str
    type: str
    label: Optional[str] = ""
    data: dict

class ReportUpdate(BaseModel):
    clinical_history: Optional[str] = ""
    findings: Optional[str] = ""
    impression: Optional[str] = ""
    recommendations: Optional[str] = ""

class ReportResponse(BaseModel):
    id: str
    case_id: str
    clinical_history: str
    findings: str
    impression: str
    recommendations: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class AuditLogResponse(BaseModel):
    id: str
    user_id: Optional[str]
    action: str
    ip_address: Optional[str]
    details: str
    timestamp: datetime.datetime

    class Config:
        from_attributes = True

# --- Authentication Endpoints ---

@app.post("/api/auth/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == req.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    valid_roles = ["doctor", "radiologist", "admin", "hospital", "patient"]
    if req.role not in valid_roles:
        raise HTTPException(status_code=400, detail=f"Invalid role. Must be one of {valid_roles}")
    
    new_user = User(
        username=req.username,
        email=req.email,
        hashed_password=hash_password(req.password),
        role=req.role,
        hospital_id=req.hospital_id,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    audit_action(db, "register_user", {"username": req.username, "role": req.role}, user_id=new_user.id)
    return new_user

@app.post("/api/auth/login", response_model=UserResponse)
def login(req: LoginRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username).first()
    if not user or not verify_password(req.password, user.hashed_password):
        audit_action(db, "login_failed", {"username": req.username}, request=request)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials."
        )
    
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    refresh_token_str = create_refresh_token(data={"sub": user.username})
    
    expires_at = datetime.datetime.utcnow() + datetime.timedelta(days=7)
    db_refresh_token = RefreshToken(
        token=refresh_token_str,
        user_id=user.id,
        expires_at=expires_at
    )
    db.add(db_refresh_token)
    db.commit()
    
    audit_action(db, "login_success", {"username": user.username, "role": user.role}, user_id=user.id, request=request)
    
    return UserResponse(
        username=user.username,
        role=user.role,
        token=access_token,
        refresh_token=refresh_token_str
    )

@app.post("/api/auth/refresh", response_model=TokenRefreshResponse)
def refresh(req: TokenRefreshRequest, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
    )
    try:
        payload = jwt.decode(req.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        token_type: str = payload.get("type")
        if username is None or token_type != "refresh":
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception

    db_token = db.query(RefreshToken).filter(
        RefreshToken.token == req.refresh_token,
        RefreshToken.is_revoked == False
    ).first()
    
    if not db_token or db_token.expires_at < datetime.datetime.utcnow():
        raise credentials_exception
        
    user = db.query(User).filter(User.id == db_token.user_id).first()
    if not user or not user.is_active:
        raise credentials_exception
        
    db_token.is_revoked = True
    db.commit()
    
    new_access_token = create_access_token(data={"sub": user.username, "role": user.role})
    new_refresh_token_str = create_refresh_token(data={"sub": user.username})
    
    new_expires_at = datetime.datetime.utcnow() + datetime.timedelta(days=7)
    new_db_token = RefreshToken(
        token=new_refresh_token_str,
        user_id=user.id,
        expires_at=new_expires_at
    )
    db.add(new_db_token)
    db.commit()
    
    audit_action(db, "token_refresh", {"username": user.username}, user_id=user.id)
    
    return TokenRefreshResponse(
        token=new_access_token,
        refresh_token=new_refresh_token_str
    )

@app.post("/api/auth/logout")
def logout(req: TokenRefreshRequest, db: Session = Depends(get_db)):
    db_token = db.query(RefreshToken).filter(RefreshToken.token == req.refresh_token).first()
    if db_token:
        db_token.is_revoked = True
        db.commit()
        audit_action(db, "logout", {}, user_id=db_token.user_id)
    return {"status": "success", "detail": "Successfully logged out."}

@app.get("/api/auth/me", response_model=UserProfileOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# --- Case Management Endpoints ---

@app.get("/api/cases")
def list_cases(request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    query = db.query(Case)
    
    if current_user.role == "admin":
        pass
    elif current_user.role == "hospital":
        query = query.filter(Case.hospital_id == current_user.id)
    elif current_user.role == "radiologist":
        if current_user.hospital_id:
            query = query.filter((Case.radiologist_id == current_user.id) | (Case.hospital_id == current_user.hospital_id))
        else:
            query = query.filter(Case.radiologist_id == current_user.id)
    elif current_user.role == "doctor":
        query = query.filter(Case.doctor_id == current_user.id)
    elif current_user.role == "patient":
        query = query.filter(Case.patient_id == current_user.id)
    else:
        raise HTTPException(status_code=403, detail="Invalid user role")
        
    cases = query.order_by(Case.created_at.desc()).all()
    audit_action(db, "list_cases", {"count": len(cases)}, user_id=current_user.id, request=request)
    return cases

@app.get("/api/cases/{case_id}")
def get_case(case_id: str, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    audit_action(db, "view_case", {"case_id": case_id}, user_id=current_user.id, request=request)
    return case

@app.put("/api/cases/{case_id}")
def update_case(
    case_id: str,
    req: CaseUpdate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital", "radiologist"]))
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    
    update_data = req.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(case, key, value)
        
    case.updated_at = datetime.datetime.utcnow()
    db.commit()
    db.refresh(case)
    
    audit_action(db, "update_case", {"case_id": case_id, "fields": list(update_data.keys())}, user_id=current_user.id, request=request)
    return case

# Upload DICOM Zip Endpoint
@app.post("/api/cases/upload")
def upload_case(
    background_tasks: BackgroundTasks,
    request: Request,
    file: UploadFile = File(...),
    deidentify: bool = True,
    patient_id: Optional[str] = None,
    doctor_id: Optional[str] = None,
    study_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital", "radiologist"]))
):
    if not file.filename.endswith(".zip"):
        raise HTTPException(status_code=400, detail="Only ZIP archives are supported.")

    case_id = str(uuid.uuid4())[:8]  # Short user-friendly ID
    zip_path = os.path.join(UPLOAD_DIR, f"{case_id}.zip")

    # Save uploaded file
    try:
        with open(zip_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save upload: {str(e)}")

    hosp_id = None
    if current_user.role == "hospital":
        hosp_id = current_user.id
    elif current_user.role == "radiologist":
        hosp_id = current_user.hospital_id

    # Create Case record
    new_case = Case(
        id=case_id,
        patient_id=patient_id or "Processing...",
        patient_name="Processing...",
        modality="TBD",
        study_uid="",
        series_uid="",
        slice_count=0,
        status="processing",
        progress=0,
        doctor_id=doctor_id,
        radiologist_id=current_user.id if current_user.role == "radiologist" else None,
        hospital_id=hosp_id,
        study_id=study_id
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    # Check if Celery is enabled and redis is accessible
    use_celery = False
    if USE_CELERY:
        try:
            import redis
            r = redis.Redis.from_url(CELERY_BROKER_URL, socket_connect_timeout=1)
            r.ping()
            use_celery = True
        except Exception:
            use_celery = False

    # Spawn async processing task
    if use_celery:
        process_dicom_task.delay(
            case_id=case_id,
            zip_path=zip_path,
            storage_dir=STORAGE_DIR,
            deidentify=deidentify
        )
    else:
        # Fallback to FastAPI BackgroundTasks with an isolated database session bound to the request's engine bind
        from sqlalchemy.orm import sessionmaker
        BgSession = sessionmaker(bind=db.bind, autocommit=False, autoflush=False, expire_on_commit=False)

        def run_processing_in_background(case_id, zip_path, storage_dir, deidentify):
            bg_db = BgSession()
            try:
                process_dicom_zip(
                    case_id=case_id,
                    zip_path=zip_path,
                    storage_dir=storage_dir,
                    db_session=bg_db,
                    deidentify=deidentify
                )
            except Exception as e:
                import logging
                logging.getLogger("background_tasks").error(f"Error in background processing task for case {case_id}: {e}")
            finally:
                bg_db.close()

        background_tasks.add_task(
            run_processing_in_background,
            case_id=case_id,
            zip_path=zip_path,
            storage_dir=STORAGE_DIR,
            deidentify=deidentify
        )

    audit_action(
        db,
        "upload_case",
        {"case_id": case_id, "filename": file.filename, "patient_id": patient_id, "doctor_id": doctor_id, "study_id": study_id, "backend": "celery" if use_celery else "background_tasks"},
        user_id=current_user.id,
        request=request
    )

    db.close()  # Release database locks before background processing starts
    return new_case

# Progress Tracking Endpoint
@app.get("/api/cases/{case_id}/progress")
def get_case_progress(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    return {
        "case_id": case_id,
        "status": case.status,
        "progress": case.progress,
        "error_message": case.error_message
    }

# Binary Volume Download
@app.get("/api/cases/{case_id}/volume")
def get_volume_manifest(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    
    if case.status != "completed":
        return JSONResponse(
            status_code=400,
            content={"status": case.status, "detail": "Volume is not fully processed or has failed."}
        )
    
    try:
        stream = storage_manager.get_file_stream(f"cases/{case_id}/volume.json")
        data = json.loads(stream.read().decode("utf-8"))
        audit_action(db, "view_volume_manifest", {"case_id": case_id}, user_id=current_user.id, request=request)
        return data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Volume descriptor not found: {e}")

@app.get("/api/cases/{case_id}/volume/raw")
def get_volume_raw(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    
    if case.status != "completed":
        raise HTTPException(status_code=400, detail="Volume is not processed yet.")

    try:
        stream = storage_manager.get_file_stream(f"cases/{case_id}/volume.bin")
        audit_action(db, "download_volume_raw", {"case_id": case_id}, user_id=current_user.id, request=request)
        return StreamingResponse(
            stream, 
            media_type="application/octet-stream", 
            headers={"Content-Disposition": f"attachment; filename=case_{case_id}_volume.bin"}
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Binary volume file not found: {e}")

# NIfTI Download Endpoint
@app.get("/api/cases/{case_id}/nifti")
def get_case_nifti(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    
    if case.status != "completed":
        raise HTTPException(status_code=400, detail="NIfTI file is not processed yet.")

    try:
        nifti_key = case.nifti_path or f"cases/{case_id}/volume.nii.gz"
        stream = storage_manager.get_file_stream(nifti_key)
        audit_action(db, "download_nifti", {"case_id": case_id}, user_id=current_user.id, request=request)
        return StreamingResponse(
            stream,
            media_type="application/gzip",
            headers={"Content-Disposition": f"attachment; filename=case_{case_id}_volume.nii.gz"}
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"NIfTI file not found: {e}")

# Annotations CRUD API

@app.get("/api/cases/{case_id}/annotations")
def get_annotations(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    
    annotations = db.query(Annotation).filter(Annotation.case_id == case_id).all()
    audit_action(db, "get_annotations", {"case_id": case_id}, user_id=current_user.id, request=request)
    return [ann.to_dict() for ann in annotations]

@app.post("/api/cases/{case_id}/annotations")
def save_annotation(
    case_id: str,
    ann: AnnotationCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "doctor", "radiologist"]))
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    verify_case_access(case, current_user)

    existing = db.query(Annotation).filter(Annotation.id == ann.id).first()
    if existing:
        existing.label = ann.label
        existing.data = json.dumps(ann.data)
        db.commit()
        db.refresh(existing)
        audit_action(db, "update_annotation", {"case_id": case_id, "annotation_id": ann.id}, user_id=current_user.id, request=request)
        return existing.to_dict()
    
    new_ann = Annotation(
        id=ann.id,
        case_id=case_id,
        type=ann.type,
        label=ann.label,
        data=json.dumps(ann.data)
    )
    db.add(new_ann)
    db.commit()
    db.refresh(new_ann)
    
    audit_action(db, "create_annotation", {"case_id": case_id, "annotation_id": ann.id}, user_id=current_user.id, request=request)
    return new_ann.to_dict()

@app.delete("/api/cases/{case_id}/annotations/{annotation_id}")
def delete_annotation(
    case_id: str,
    annotation_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "doctor", "radiologist"]))
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    verify_case_access(case, current_user)
    
    ann = db.query(Annotation).filter(Annotation.case_id == case_id, Annotation.id == annotation_id).first()
    if not ann:
        raise HTTPException(status_code=404, detail="Annotation not found")
    
    db.delete(ann)
    db.commit()
    
    audit_action(db, "delete_annotation", {"case_id": case_id, "annotation_id": annotation_id}, user_id=current_user.id, request=request)
    return {"status": "success", "detail": "Annotation deleted."}

# --- Structured Reports endpoints ---

@app.get("/api/cases/{case_id}/report")
def get_report(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    verify_case_access(case, current_user)
    
    report = db.query(Report).filter(Report.case_id == case_id).first()
    if not report:
        # Create empty report
        report = Report(case_id=case_id)
        db.add(report)
        db.commit()
        db.refresh(report)
    
    return report.to_dict()

@app.post("/api/cases/{case_id}/report")
def save_report(
    case_id: str,
    req: ReportUpdate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "doctor", "radiologist"]))
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    verify_case_access(case, current_user)
    
    report = db.query(Report).filter(Report.case_id == case_id).first()
    if not report:
        report = Report(
            case_id=case_id,
            clinical_history=req.clinical_history,
            findings=req.findings,
            impression=req.impression,
            recommendations=req.recommendations
        )
        db.add(report)
    else:
        report.clinical_history = req.clinical_history
        report.findings = req.findings
        report.impression = req.impression
        report.recommendations = req.recommendations
        report.updated_at = datetime.datetime.utcnow()
        
    db.commit()
    db.refresh(report)
    audit_action(db, "save_report", {"case_id": case_id, "report_id": report.id}, user_id=current_user.id, request=request)
    return report.to_dict()

@app.get("/api/cases/{case_id}/report/pdf")
def get_report_pdf(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    verify_case_access(case, current_user)

    report = db.query(Report).filter(Report.case_id == case_id).first()
    if not report:
        report = Report(case_id=case_id)
        db.add(report)
        db.commit()
        db.refresh(report)

    annotations = db.query(Annotation).filter(Annotation.case_id == case_id).all()

    # Create PDF in memory
    import io
    buffer = io.BytesIO()
    
    # Import reportlab components locally
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    story = []
    styles = getSampleStyleSheet()

    # Styles
    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        "DocSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        textColor=colors.HexColor("#64748b"),
        spaceAfter=15
    )
    section_title = ParagraphStyle(
        "SecTitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        textColor=colors.HexColor("#1e3a8a"),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        textColor=colors.HexColor("#334155"),
        leading=13.5,
        spaceAfter=6
    )
    meta_label = ParagraphStyle(
        "MetaLabel",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        textColor=colors.HexColor("#475569")
    )
    meta_val = ParagraphStyle(
        "MetaVal",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        textColor=colors.HexColor("#0f172a")
    )

    # Document Header
    story.append(Paragraph("AVIOTHIC.AI CLINICAL REPORT", title_style))
    story.append(Paragraph(f"Generated: {datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')} | Case ID: {case.id}", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#1e3a8a"), spaceAfter=15))

    # Patient & Scan Specifications Table
    patient_dob = case.patient_birth_date or "N/A"
    patient_sex = case.patient_sex or "N/A"
    modality = case.modality or "N/A"
    scan_dims = f"{case.width or 0} x {case.height or 0} x {case.depth or 0}"
    spacing = f"{case.dx or 0.0:.2f} x {case.dy or 0.0:.2f} x {case.dz or 0.0:.2f} mm"

    meta_data = [
        [Paragraph("Patient Name:", meta_label), Paragraph(case.patient_name or "N/A", meta_val),
         Paragraph("Modality:", meta_label), Paragraph(modality, meta_val)],
        [Paragraph("Patient ID:", meta_label), Paragraph(case.patient_id or "N/A", meta_val),
         Paragraph("Dimensions:", meta_label), Paragraph(scan_dims, meta_val)],
        [Paragraph("Patient DOB/Sex:", meta_label), Paragraph(f"{patient_dob} / {patient_sex}", meta_val),
         Paragraph("Pixel Spacing:", meta_label), Paragraph(spacing, meta_val)]
    ]

    t_meta = Table(meta_data, colWidths=[100, 160, 100, 160])
    t_meta.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('INNERGRID', (0,0), (-1,-1), 0.25, colors.HexColor("#cbd5e1")),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 15))

    # Clinical History Section
    story.append(Paragraph("Clinical History", section_title))
    story.append(Paragraph(report.clinical_history or "No clinical history provided.", body_style))
    story.append(Spacer(1, 10))

    # Measurements & Findings Section
    story.append(Paragraph("Measurements & Quantitative Findings", section_title))
    if not annotations:
        story.append(Paragraph("No quantitative measurements recorded for this case.", body_style))
    else:
        # Build Table of annotations
        headers = [
            Paragraph("Label", meta_label),
            Paragraph("Type", meta_label),
            Paragraph("Slicing Location", meta_label),
            Paragraph("Measurement Value", meta_label),
            Paragraph("Notes", meta_label)
        ]
        
        table_data = [headers]
        
        for ann in annotations:
            try:
                ann_data = json.loads(ann.data)
            except Exception:
                ann_data = {}
            ann_type = ann.type.replace("_", " ").title()
            
            # Value display depending on type
            val_str = "N/A"
            if ann.type == "distance" and "distanceMm" in ann_data:
                val_str = f"{ann_data['distanceMm']} mm"
            elif ann.type == "angle" and "angleDeg" in ann_data:
                val_str = f"{ann_data['angleDeg']}°"
            elif ann.type == "area" and "areaMm2" in ann_data:
                val_str = f"{ann_data['areaMm2']} mm²"
            elif ann.type in ["roi_rect", "roi_circle"]:
                area = ann_data.get("areaMm2", 0.0)
                stats = ann_data.get("stats", {})
                mean_val = stats.get("mean", 0.0)
                val_str = f"Area: {area:.1f} mm²\nMean: {mean_val:.1f}"
            elif ann.type == "volume_sphere":
                vol = ann_data.get("volumeMm3", 0.0) / 1000.0  # cc
                val_str = f"Vol: {vol:.2f} cc"
                if "voxelVolumeMm3" in ann_data:
                    vvol = ann_data.get("voxelVolumeMm3", 0.0) / 1000.0
                    val_str += f"\nThreshold: {vvol:.2f} cc"
            elif ann.type == "text":
                val_str = "Marker Note"

            slice_info = f"{ann_data.get('viewportType', '').title()} (Slice {ann_data.get('sliceIndex', 0)})"
            
            label_text = ann.label or f"Annotation-{ann.id[:4]}"
            notes_text = ann_data.get("notes", "") or "-"
            
            table_data.append([
                Paragraph(label_text, meta_val),
                Paragraph(ann_type, meta_val),
                Paragraph(slice_info, meta_val),
                Paragraph(val_str.replace('\n', '<br/>'), meta_val),
                Paragraph(notes_text, meta_val)
            ])
            
        t_ann = Table(table_data, colWidths=[90, 80, 110, 110, 130])
        t_ann.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ]))
        story.append(t_ann)
    story.append(Spacer(1, 15))

    # Findings Text Section
    story.append(Paragraph("Radiologist Findings", section_title))
    story.append(Paragraph(report.findings or "No narrative findings reported.", body_style))
    story.append(Spacer(1, 10))

    # Diagnostic Impression
    story.append(Paragraph("Diagnostic Impression", section_title))
    story.append(Paragraph(report.impression or "No diagnostic impression provided.", body_style))
    story.append(Spacer(1, 10))

    # Recommendations
    story.append(Paragraph("Recommendations", section_title))
    story.append(Paragraph(report.recommendations or "No follow-up recommendations provided.", body_style))
    story.append(Spacer(1, 30))

    # Signature Block
    story.append(Paragraph("Finalized by:", meta_label))
    story.append(Spacer(1, 4))
    story.append(Paragraph(f"Dr. {current_user.username.title()}, MD<br/>Aviothic PACS Clinical Service", meta_val))
    story.append(Spacer(1, 40))

    # Regulatory Disclaimer
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=10))
    disclaimer_style = ParagraphStyle(
        "Disclaimer",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=7.5,
        textColor=colors.HexColor("#94a3b8"),
        leading=10,
        alignment=1 # Center
    )
    story.append(Paragraph(
        "Regulatory Notice: This report is generated by a pre-surgical planning and visualization aid. "
        "It is designed as an assistant tool and must be reviewed, validated, and signed by a qualified clinical physician "
        "before diagnostic or therapeutic decisions are finalized.",
        disclaimer_style
    ))

    doc.build(story)
    buffer.seek(0)

    audit_action(db, "export_report_pdf", {"case_id": case_id}, user_id=current_user.id, request=request)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=Case_{case_id}_Clinical_Report.pdf"}
    )

# Case Deletion
@app.delete("/api/cases/{case_id}")
def delete_case(
    case_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital"]))
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    verify_case_access(case, current_user)

    # Delete storage key (deletes locally and S3)
    storage_manager.delete_file(f"cases/{case_id}")

    # Delete db record
    db.delete(case)
    db.commit()
    
    audit_action(db, "delete_case", {"case_id": case_id}, user_id=current_user.id, request=request)
    return {"status": "success", "detail": f"Case {case_id} deleted."}

# --- Study CRUD Endpoints ---

@app.post("/api/studies", response_model=StudyResponse, status_code=status.HTTP_201_CREATED)
def create_study(
    req: StudyCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital", "radiologist"]))
):
    if req.study_uid and db.query(Study).filter(Study.study_uid == req.study_uid).first():
        raise HTTPException(status_code=400, detail="Study UID already exists")
        
    hosp_id = req.hospital_id
    if current_user.role == "hospital":
        hosp_id = current_user.id
    elif current_user.role == "radiologist" and not hosp_id:
        hosp_id = current_user.hospital_id
        
    new_study = Study(
        study_uid=req.study_uid or f"1.3.6.1.4.1.99999.{str(uuid.uuid4().int)[:15]}",
        description=req.description,
        study_date=req.study_date or datetime.date.today().strftime("%Y%m%d"),
        patient_id=req.patient_id,
        hospital_id=hosp_id
    )
    db.add(new_study)
    db.commit()
    db.refresh(new_study)
    
    audit_action(db, "create_study", {"study_id": new_study.id, "study_uid": new_study.study_uid}, user_id=current_user.id, request=request)
    return new_study

@app.get("/api/studies", response_model=List[StudyResponse])
def list_studies(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Study)
    
    if current_user.role == "admin":
        pass
    elif current_user.role == "hospital":
        query = query.filter(Study.hospital_id == current_user.id)
    elif current_user.role == "radiologist":
        if current_user.hospital_id:
            query = query.filter(Study.hospital_id == current_user.hospital_id)
        else:
            query = query.join(Case).filter(Case.radiologist_id == current_user.id)
    elif current_user.role == "doctor":
        query = query.join(Case).filter(Case.doctor_id == current_user.id)
    elif current_user.role == "patient":
        query = query.filter(Study.patient_id == current_user.id)
        
    studies = query.distinct().all()
    audit_action(db, "list_studies", {"count": len(studies)}, user_id=current_user.id, request=request)
    return studies

@app.get("/api/studies/{study_id}", response_model=StudyResponse)
def get_study(
    study_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    study = db.query(Study).filter(Study.id == study_id).first()
    if not study:
        raise HTTPException(status_code=404, detail="Study not found")
        
    verify_study_access(db, study, current_user)
    audit_action(db, "view_study", {"study_id": study_id}, user_id=current_user.id, request=request)
    return study

@app.put("/api/studies/{study_id}", response_model=StudyResponse)
def update_study(
    study_id: str,
    req: StudyUpdate,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital", "radiologist"]))
):
    study = db.query(Study).filter(Study.id == study_id).first()
    if not study:
        raise HTTPException(status_code=404, detail="Study not found")
        
    verify_study_access(db, study, current_user)
    
    update_data = req.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(study, key, value)
        
    study.updated_at = datetime.datetime.utcnow()
    db.commit()
    db.refresh(study)
    
    audit_action(db, "update_study", {"study_id": study_id, "fields": list(update_data.keys())}, user_id=current_user.id, request=request)
    return study

@app.delete("/api/studies/{study_id}")
def delete_study(
    study_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital"]))
):
    study = db.query(Study).filter(Study.id == study_id).first()
    if not study:
        raise HTTPException(status_code=404, detail="Study not found")
        
    verify_study_access(db, study, current_user)
    
    db.delete(study)
    db.commit()
    
    audit_action(db, "delete_study", {"study_id": study_id}, user_id=current_user.id, request=request)
    return {"status": "success", "detail": f"Study {study_id} deleted."}

# --- Audit Logs Endpoint ---

@app.get("/api/audit-logs", response_model=List[AuditLogResponse])
def list_audit_logs(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(RequireRole(["admin", "hospital"]))
):
    query = db.query(AuditLog)
    
    if current_user.role == "admin":
        pass
    elif current_user.role == "hospital":
        subquery_users = db.query(User.id).filter((User.hospital_id == current_user.id) | (User.id == current_user.id))
        query = query.filter(AuditLog.user_id.in_(subquery_users))
        
    logs = query.order_by(AuditLog.timestamp.desc()).all()
    audit_action(db, "view_audit_logs", {"count": len(logs)}, user_id=current_user.id, request=request)
    return logs

# --- Health Check Endpoints ---

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/health/worker")
def worker_check():
    # If Celery is enabled, inspect Celery worker status
    if USE_CELERY:
        try:
            from celery_app import celery_app
            insp = celery_app.control.inspect()
            ping_res = insp.ping()
            if ping_res:
                return {"status": "healthy", "worker": "active", "pings": ping_res}
            else:
                return {"status": "degraded", "worker": "no active workers found"}
        except Exception as e:
            return {"status": "degraded", "worker": f"could not inspect celery: {e}"}
    return {"status": "healthy", "worker": "background_tasks_active"}
