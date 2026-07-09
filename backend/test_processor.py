import os
import sys
import json

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_db, SessionLocal, Case
from processor import process_dicom_zip

def test_pipeline():
    print("Starting integration test for processor pipeline...")
    
    # Initialize DB
    init_db()
    db = SessionLocal()

    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    zip_path = os.path.join(base_dir, "data", "samples", "brain_case.zip")
    storage_dir = os.path.join(base_dir, "data", "storage")
    
    case_id = "test_brain_case"

    # Clean up previous runs if any
    existing_case = db.query(Case).filter(Case.id == case_id).first()
    if existing_case:
        db.delete(existing_case)
        db.commit()
    
    case_dir = os.path.join(storage_dir, case_id)
    if os.path.exists(case_dir):
        import shutil
        shutil.rmtree(case_dir)

    # 1. Create a pending case in DB
    test_case = Case(
        id=case_id,
        patient_id="PENDING",
        patient_name="PENDING",
        modality="MR",
        status="pending"
    )
    db.add(test_case)
    db.commit()

    print(f"Created pending case '{case_id}' in SQLite database.")

    # 2. Run processor
    print("Running process_dicom_zip...")
    process_dicom_zip(
        case_id=case_id,
        zip_path=zip_path,
        storage_dir=storage_dir,
        db_session=db,
        deidentify=True
    )

    # 3. Assertions
    db.refresh(test_case)
    print(f"Post-processing case status: {test_case.status}")
    assert test_case.status == "completed", f"Processing failed! Error: {test_case.error_message}"
    
    bin_file = os.path.join(case_dir, "volume.bin")
    json_file = os.path.join(case_dir, "volume.json")
    
    assert os.path.exists(bin_file), "volume.bin was not created!"
    assert os.path.exists(json_file), "volume.json was not created!"
    
    # Read manifest
    with open(json_file, "r") as f:
        meta = json.load(f)
        
    print("\n--- Processed Volume Metadata ---")
    print(json.dumps(meta, indent=2))
    print("---------------------------------")
    
    assert meta["width"] == 128
    assert meta["height"] == 128
    assert meta["depth"] == 64
    assert meta["dx"] == 1.5
    assert meta["dy"] == 1.5
    assert meta["dz"] == 2.0
    
    print("\nIntegration test PASSED successfully!")
    db.close()

if __name__ == "__main__":
    test_pipeline()
