import os
import cloudinary
import cloudinary.uploader

def configure_cloudinary():
    """Ensure Cloudinary is configured with current environment variables."""
    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True,
    )

def upload_image_to_cloudinary(file_obj, filename: str) -> str:
    """Uploads a file to Cloudinary and returns the public URL."""
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
    api_key = os.getenv("CLOUDINARY_API_KEY")
    api_secret = os.getenv("CLOUDINARY_API_SECRET")

    if not all([cloud_name, api_key, api_secret]):
        missing = []
        if not cloud_name: missing.append("CLOUDINARY_CLOUD_NAME")
        if not api_key: missing.append("CLOUDINARY_API_KEY")
        if not api_secret: missing.append("CLOUDINARY_API_SECRET")
        raise ValueError(f"Missing Cloudinary env vars: {', '.join(missing)}")

    configure_cloudinary()

    if hasattr(file_obj, "seek"):
        file_obj.seek(0)

    # Use the filename (without extension) as the public_id for clean URLs
    public_id = os.path.splitext(filename)[0]

    result = cloudinary.uploader.upload(
        file_obj,
        public_id=f"ubglobal/{public_id}",
        overwrite=True,
        resource_type="image",
    )

    return result["secure_url"]
