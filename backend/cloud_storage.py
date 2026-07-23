import os
import cloudinary
import cloudinary.uploader

# Configure Cloudinary from .env
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)


def upload_image_to_cloudinary(file_obj, filename: str) -> str:
    """Uploads a file to Cloudinary and returns the public URL."""
    if not os.getenv("CLOUDINARY_CLOUD_NAME"):
        raise ValueError("Cloudinary credentials not configured in .env")

    # Use the filename (without extension) as the public_id for clean URLs
    public_id = os.path.splitext(filename)[0]

    result = cloudinary.uploader.upload(
        file_obj,
        public_id=f"ubglobal/{public_id}",
        overwrite=True,
        resource_type="image",
    )

    return result["secure_url"]
