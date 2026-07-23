import os
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from dependencies import get_current_admin
from cloud_storage import upload_image_to_cloudinary

router = APIRouter(prefix="/api/upload", tags=["upload"])

# Local fallback directory
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "frontend", "public", "uploads")

@router.post("")
async def upload_image(
    file: UploadFile = File(...),
    admin: dict = Depends(get_current_admin)
):
    """Upload an image to Cloudinary."""
    # Ensure it's an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
        
    ext = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    
    # Try Cloudinary first
    try:
        url = upload_image_to_cloudinary(file.file, unique_filename)
        return {"url": url}
    except Exception as e:
        print(f"[CLOUDINARY ERROR] {e}")
        # If Cloudinary is missing or fails, report the error directly
        if os.getenv("CLOUDINARY_CLOUD_NAME"):
            raise HTTPException(status_code=500, detail=f"Cloudinary Upload Failed: {str(e)}")
            
    # Fallback to local only for local offline dev if CLOUDINARY_CLOUD_NAME is not set
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    file.file.seek(0)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"url": f"/uploads/{unique_filename}"}
