import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# All config from .env — no hardcoded secrets
MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ubglobal")

if not MONGODB_URL:
    raise RuntimeError("MONGODB_URL is not set in .env file")

client: AsyncIOMotorClient = None
db = None


async def connect_db():
    """Connect to MongoDB Atlas on app startup."""
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    await client.admin.command("ping")
    print(f"[OK] Connected to MongoDB Atlas - database: {DATABASE_NAME}")


async def close_db():
    """Close MongoDB connection on app shutdown."""
    global client
    if client:
        client.close()
        print("[INFO] MongoDB connection closed")


def get_db():
    """Return the database instance."""
    return db
