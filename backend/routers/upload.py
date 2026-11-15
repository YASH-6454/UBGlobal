import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from starlette.concurrency import run_in_threadpool
from dependencies import get_current_admin
from cloud_storage import upload_image_to_cloudinary

router = APIRouter(prefix="/api/upload", tags=["upload"])

# Local fallback directory
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "frontend", "public", "uploads")

MAX_UPLOAD_BYTES = 10 * 1024 * 1024  # 10 MB

# Only raster image formats. SVG/HTML are rejected because they can carry scripts.
# Detected from the file's actual bytes, never from the client-supplied name/content-type.
def detect_image_ext(head: bytes) -> str | None:
    if head.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "gif"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "webp"
    if head[4:12] in (b"ftypavif", b"ftypavis"):
        return "avif"
    return None


@router.post("")
async def upload_image(
    file: UploadFile = File(...),
    admin: dict = Depends(get_current_admin)
):
    """Upload an image to Cloudinary."""
    data = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image is too large (max 10 MB)")

    ext = detect_image_ext(data[:16])
    if ext is None:
        raise HTTPException(status_code=400, detail="File must be a JPG, PNG, WEBP, GIF or AVIF image")

    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    file.file.seek(0)

    # Try Cloudinary first (runs in a thread so it doesn't block other requests)
    try:
        url = await run_in_threadpool(upload_image_to_cloudinary, file.file, unique_filename)
        return {"url": url}
    except Exception as e:
        print(f"[CLOUDINARY ERROR] {e}")
        if os.getenv("CLOUDINARY_CLOUD_NAME"):
            raise HTTPException(status_code=502, detail="Image upload to Cloudinary failed. Please try again.")

    # Fallback to local only for local offline dev if CLOUDINARY_CLOUD_NAME is not set
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(data)

    return {"url": f"/uploads/{unique_filename}"}
