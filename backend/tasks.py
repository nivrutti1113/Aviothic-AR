import logging
from celery_app import celery_app
from database import SessionLocal, Case
from processor import process_dicom_zip

logger = logging.getLogger("tasks")

@celery_app.task(bind=True, name="tasks.process_dicom_task")
def process_dicom_task(self, case_id: str, zip_path: str, storage_dir: str, deidentify: bool = True):
    logger.info(f"Celery task started processing case {case_id}")
    
    # Define progress callback
    def progress_callback(percent: int, message: str = ""):
        self.update_state(
            state="PROGRESS",
            meta={"percent": percent, "message": message}
        )
        logger.info(f"Case {case_id} progress: {percent}% - {message}")
        
        # Also update Case in database
        db = SessionLocal()
        try:
            case_record = db.query(Case).filter(Case.id == case_id).first()
            if case_record:
                case_record.progress = percent
                if percent == 100:
                    case_record.status = "completed"
                    case_record.error_message = None
                db.commit()
        except Exception as e:
            logger.error(f"Failed to update progress in DB: {e}")
        finally:
            db.close()

    try:
        db = SessionLocal()
        # Call the core processor function, passing the progress callback
        process_dicom_zip(
            case_id=case_id,
            zip_path=zip_path,
            storage_dir=storage_dir,
            db_session=db,
            deidentify=deidentify,
            progress_callback=progress_callback
        )
        db.close()
        logger.info(f"Celery task completed processing case {case_id}")
        return {"status": "completed", "case_id": case_id}
    except Exception as e:
        logger.error(f"Celery task failed processing case {case_id}: {e}")
        db = SessionLocal()
        try:
            case_record = db.query(Case).filter(Case.id == case_id).first()
            if case_record:
                case_record.status = "failed"
                case_record.error_message = str(e)
                case_record.progress = 0
                db.commit()
        except Exception as db_err:
            logger.error(f"Failed to save error status to DB: {db_err}")
        finally:
            db.close()
        raise e
