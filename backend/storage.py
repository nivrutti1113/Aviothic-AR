import os
import shutil
import logging
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from dotenv import load_dotenv

load_dotenv()

# Setup Logging
logger = logging.getLogger("storage")
logging.basicConfig(level=logging.INFO)

# Load config
STORAGE_BACKEND = os.getenv("STORAGE_BACKEND", "local").lower()
S3_ENDPOINT_URL = os.getenv("S3_ENDPOINT_URL", None)
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY", None)
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY", None)
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "aviothic-ar")
S3_REGION_NAME = os.getenv("S3_REGION_NAME", "us-east-1")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(BASE_DIR)
LOCAL_STORAGE_DIR = os.path.join(PARENT_DIR, "data", "storage")

os.makedirs(LOCAL_STORAGE_DIR, exist_ok=True)

class StorageManager:
    def __init__(self):
        self.backend = STORAGE_BACKEND
        self.s3_client = None
        self.bucket = S3_BUCKET_NAME
        
        if self.backend == "s3":
            try:
                # If access keys are not provided, it will fallback to standard credentials resolution
                session_opts = {}
                if S3_ACCESS_KEY and S3_SECRET_KEY:
                    session_opts = {
                        "aws_access_key_id": S3_ACCESS_KEY,
                        "aws_secret_access_key": S3_SECRET_KEY
                    }
                
                self.s3_client = boto3.client(
                    "s3",
                    endpoint_url=S3_ENDPOINT_URL,
                    region_name=S3_REGION_NAME,
                    **session_opts
                )
                
                # Check / Create bucket
                try:
                    self.s3_client.head_bucket(Bucket=self.bucket)
                    logger.info(f"S3/MinIO bucket '{self.bucket}' exists and is accessible.")
                except ClientError as e:
                    error_code = e.response['Error']['Code']
                    if error_code == '404':
                        logger.info(f"S3/MinIO bucket '{self.bucket}' not found. Creating bucket...")
                        # If endpoint is specified (e.g. MinIO), we can create bucket without LocationConstraint
                        if S3_ENDPOINT_URL:
                            self.s3_client.create_bucket(Bucket=self.bucket)
                        else:
                            self.s3_client.create_bucket(
                                Bucket=self.bucket,
                                CreateBucketConfiguration={'LocationConstraint': S3_REGION_NAME}
                            )
                        logger.info(f"Bucket '{self.bucket}' created successfully.")
                    else:
                        raise e
            except Exception as e:
                logger.error(f"Failed to initialize S3/MinIO client: {e}. Falling back to LOCAL storage.")
                self.backend = "local"
                self.s3_client = None

    def upload_file(self, local_path: str, key: str) -> bool:
        """
        Uploads a file to local storage or S3/MinIO.
        """
        key = key.replace("\\", "/") # Ensure S3 friendly keys
        if self.backend == "s3" and self.s3_client:
            try:
                self.s3_client.upload_file(
                    local_path, 
                    self.bucket, 
                    key,
                    ExtraArgs={"ServerSideEncryption": "AES256"}
                )
                logger.info(f"Uploaded {local_path} to S3://{self.bucket}/{key} with AES256 SSE")
                return True
            except Exception as e:
                logger.error(f"S3 upload failed: {e}. Attempting local fallback.")
        
        # Local storage (either by choice or fallback)
        try:
            dest_path = os.path.join(LOCAL_STORAGE_DIR, key)
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            shutil.copy2(local_path, dest_path)
            logger.info(f"Saved {local_path} to local storage at {dest_path}")
            return True
        except Exception as e:
            logger.error(f"Local storage save failed: {e}")
            return False

    def download_file(self, key: str, local_path: str) -> bool:
        """
        Downloads a file from local storage or S3/MinIO.
        """
        key = key.replace("\\", "/")
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        if self.backend == "s3" and self.s3_client:
            try:
                self.s3_client.download_file(self.bucket, key, local_path)
                logger.info(f"Downloaded S3://{self.bucket}/{key} to {local_path}")
                return True
            except Exception as e:
                logger.error(f"S3 download failed: {e}. Attempting local fallback.")
                
        # Local storage download/copy
        dest_path = os.path.join(LOCAL_STORAGE_DIR, key)
        if os.path.exists(dest_path):
            try:
                shutil.copy2(dest_path, local_path)
                logger.info(f"Copied local storage {dest_path} to {local_path}")
                return True
            except Exception as e:
                logger.error(f"Local copy failed: {e}")
                return False
        else:
            logger.error(f"File key '{key}' not found in local storage.")
            return False

    def get_file_stream(self, key: str):
        """
        Returns a file-like stream object for the given key.
        """
        key = key.replace("\\", "/")
        if self.backend == "s3" and self.s3_client:
            try:
                response = self.s3_client.get_object(Bucket=self.bucket, Key=key)
                return response['Body']
            except Exception as e:
                logger.error(f"Failed to stream from S3: {e}. Trying local storage.")
                
        dest_path = os.path.join(LOCAL_STORAGE_DIR, key)
        if os.path.exists(dest_path):
            return open(dest_path, "rb")
        else:
            raise FileNotFoundError(f"Key '{key}' not found in S3 or local storage.")

    def delete_file(self, key: str) -> bool:
        """
        Deletes a file from storage.
        """
        key = key.replace("\\", "/")
        success = True
        if self.backend == "s3" and self.s3_client:
            try:
                self.s3_client.delete_object(Bucket=self.bucket, Key=key)
                logger.info(f"Deleted S3://{self.bucket}/{key}")
            except Exception as e:
                logger.error(f"Failed to delete S3 file: {e}")
                success = False
                
        dest_path = os.path.join(LOCAL_STORAGE_DIR, key)
        if os.path.exists(dest_path):
            try:
                if os.path.isdir(dest_path):
                    shutil.rmtree(dest_path)
                else:
                    os.remove(dest_path)
                logger.info(f"Deleted local file/directory {dest_path}")
            except Exception as e:
                logger.error(f"Failed to delete local file: {e}")
                success = False
        return success

storage_manager = StorageManager()
