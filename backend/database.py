import datetime
import os
import uuid
import json
import bcrypt
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WORKSPACE_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = os.path.join(WORKSPACE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)
DB_PATH = os.path.join(DATA_DIR, "metadata.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, expire_on_commit=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # doctor, radiologist, admin, hospital, patient
    hospital_id = Column(String, ForeignKey("users.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    token = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_revoked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")

class Study(Base):
    __tablename__ = "studies"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    study_uid = Column(String, unique=True, index=True, nullable=True)
    description = Column(String, nullable=True)
    study_date = Column(String, nullable=True)
    patient_id = Column(String, ForeignKey("users.id"), nullable=True)
    hospital_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    patient = relationship("User", foreign_keys=[patient_id])
    hospital = relationship("User", foreign_keys=[hospital_id])
    cases = relationship("Case", back_populates="study", cascade="all, delete-orphan")

class Case(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    patient_name = Column(String)  # Cached or fallback
    patient_birth_date = Column(String, nullable=True)
    patient_sex = Column(String, nullable=True)
    modality = Column(String)
    study_uid = Column(String)
    series_uid = Column(String)
    slice_count = Column(Integer, default=0)
    status = Column(String, default="pending")  # pending, processing, completed, failed
    progress = Column(Integer, default=0)
    nifti_path = Column(String, nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Volume parameters (filled after processing)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    depth = Column(Integer, nullable=True)
    dx = Column(Float, nullable=True)
    dy = Column(Float, nullable=True)
    dz = Column(Float, nullable=True)
    
    # Default Window/Level presets
    window_center = Column(Float, nullable=True)
    window_width = Column(Float, nullable=True)

    # Foreign Keys for Case Management
    study_id = Column(String, ForeignKey("studies.id", ondelete="SET NULL"), nullable=True)
    doctor_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    radiologist_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    hospital_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Relationships
    study = relationship("Study", back_populates="cases")
    patient = relationship("User", foreign_keys=[patient_id])
    doctor = relationship("User", foreign_keys=[doctor_id])
    radiologist = relationship("User", foreign_keys=[radiologist_id])
    hospital = relationship("User", foreign_keys=[hospital_id])
    annotations = relationship("Annotation", back_populates="case", cascade="all, delete-orphan")
    report = relationship("Report", back_populates="case", uselist=False, cascade="all, delete-orphan")

class Annotation(Base):
    __tablename__ = "annotations"

    id = Column(String, primary_key=True, index=True)
    case_id = Column(String, ForeignKey("cases.id", ondelete="CASCADE"), index=True)
    type = Column(String)  # distance, marker, angle, area, roi_rect, roi_circle, volume_sphere, text
    label = Column(String, nullable=True)
    data = Column(Text)  # JSON representation of points and slice details
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    case = relationship("Case", back_populates="annotations")

    def to_dict(self):
        return {
            "id": self.id,
            "case_id": self.case_id,
            "type": self.type,
            "label": self.label,
            "data": json.loads(self.data),
            "created_at": self.created_at.isoformat()
        }

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String, ForeignKey("cases.id", ondelete="CASCADE"), index=True, unique=True)
    clinical_history = Column(Text, nullable=True, default="")
    findings = Column(Text, nullable=True, default="")
    impression = Column(Text, nullable=True, default="")
    recommendations = Column(Text, nullable=True, default="")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    case = relationship("Case", back_populates="report")

    def to_dict(self):
        return {
            "id": self.id,
            "case_id": self.case_id,
            "clinical_history": self.clinical_history or "",
            "findings": self.findings or "",
            "impression": self.impression or "",
            "recommendations": self.recommendations or "",
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String, nullable=False)
    ip_address = Column(String, nullable=True)
    details = Column(Text, nullable=True)  # JSON string
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")

def init_db():
    Base.metadata.create_all(bind=engine)
    
    # Seed default users if users table is empty
    db = SessionLocal()
    try:
        if db.query(User).count() == 0:
            print("Seeding default users...")
            
            # Roles: doctor, radiologist, admin, hospital, patient
            default_users = [
                {"username": "admin", "email": "admin@aviothic.ai", "password": "admin123", "role": "admin"},
                {"username": "doctor", "email": "doctor@aviothic.ai", "password": "doctor123", "role": "doctor"},
                {"username": "radiologist", "email": "radiologist@aviothic.ai", "password": "clinical123", "role": "radiologist"},
                {"username": "hospital", "email": "hospital@aviothic.ai", "password": "hospital123", "role": "hospital"},
                {"username": "patient", "email": "patient@aviothic.ai", "password": "patient123", "role": "patient"}
            ]
            
            seeded_users = {}
            for user_data in default_users:
                hashed = bcrypt.hashpw(user_data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
                user = User(
                    username=user_data["username"],
                    email=user_data["email"],
                    hashed_password=hashed,
                    role=user_data["role"],
                    is_active=True
                )
                db.add(user)
                seeded_users[user_data["username"]] = user
            db.commit()
            
            # Link doctor, radiologist, patient to the hospital
            hospital = seeded_users["hospital"]
            seeded_users["doctor"].hospital_id = hospital.id
            seeded_users["radiologist"].hospital_id = hospital.id
            seeded_users["patient"].hospital_id = hospital.id
            db.commit()
            print("Default users seeded and linked successfully.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
