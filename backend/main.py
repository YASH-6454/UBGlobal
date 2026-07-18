import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from dotenv import load_dotenv

from database import connect_db, close_db, get_db
from schemas import ContactCreate, ContactResponse, HealthResponse

load_dotenv()

# Read config from .env
APP_NAME = os.getenv("APP_NAME", "United Brothers Global API")
APP_VERSION = os.getenv("APP_VERSION", "2.0.0")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage MongoDB connection lifecycle."""
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title=APP_NAME,
    description="Backend API for UBGlobal contact form and inquiries",
    version=APP_VERSION,
    lifespan=lifespan,
)

# CORS middleware — origins from .env
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers import admin, cms, upload

app.include_router(admin.router)
app.include_router(cms.router)
app.include_router(upload.router)


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Check API and database health."""
    try:
        db = get_db()
        await db.command("ping")
        return {
            "status": "ok",
            "message": f"{APP_NAME} is running",
            "database": "connected",
        }
    except Exception as e:
        return {
            "status": "degraded",
            "message": f"API running but DB issue: {str(e)}",
            "database": "disconnected",
        }


@app.post("/contact", response_model=ContactResponse)
async def create_contact(contact: ContactCreate):
    """Save a new contact inquiry to MongoDB."""
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    contact_doc = {
        "name": contact.name,
        "email": contact.email,
        "phone": contact.phone,
        "message": contact.message,
        "created_at": datetime.now(timezone.utc),
    }

    result = await db.contacts.insert_one(contact_doc)

    return ContactResponse(
        id=str(result.inserted_id),
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        message=contact.message,
        created_at=contact_doc["created_at"],
    )


@app.get("/contacts")
async def list_contacts():
    """List all contact inquiries (admin endpoint)."""
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    contacts = []
    async for doc in db.contacts.find().sort("created_at", -1).limit(100):
        contacts.append({
            "id": str(doc["_id"]),
            "name": doc["name"],
            "email": doc["email"],
            "phone": doc.get("phone"),
            "message": doc["message"],
            "created_at": doc["created_at"].isoformat(),
        })
    return {"total": len(contacts), "contacts": contacts}
