import os
import boto3
from botocore.exceptions import NoCredentialsError, ClientError

# Cloudflare R2 Config from .env
R2_ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME", "ubglobal-assets")

def get_r2_client():
    if not all([R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY]):
        print("[WARNING] Cloudflare R2 credentials not set in .env. Uploads will fail or use local fallback.")
        return None
        
    return boto3.client(
        service_name="s3",
        endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
        aws_access_key_id=R2_ACCESS_KEY_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        region_name="auto",
    )

def upload_file_to_r2(file_obj, filename: str, content_type: str) -> str:
    """Uploads a file to Cloudflare R2 and returns the public URL."""
    client = get_r2_client()
    if not client:
        raise ValueError("R2 client not configured. Please set R2 credentials in .env")

    try:
        client.upload_fileobj(
            file_obj, 
            R2_BUCKET_NAME, 
            filename,
            ExtraArgs={"ContentType": content_type}
        )
        # Assuming you have a custom domain attached to your R2 bucket for public access
        # If not, you might need to use the public R2.dev URL (if enabled)
        public_url = os.getenv("R2_PUBLIC_DOMAIN", f"https://pub-{R2_ACCOUNT_ID}.r2.dev")
        return f"{public_url}/{filename}"
    except (NoCredentialsError, ClientError) as e:
        print(f"Error uploading to R2: {e}")
        raise
