"""Add slugs to existing products that don't have one."""
import asyncio
import re
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URL", "")
DB_NAME = os.getenv("DATABASE_NAME", "ubglobal")

def generate_slug(name: str) -> str:
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

async def migrate():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    
    cursor = db.products.find({"$or": [{"slug": {"$exists": False}}, {"slug": None}, {"slug": ""}]})
    count = 0
    async for doc in cursor:
        slug = generate_slug(doc["name"])
        await db.products.update_one(
            {"_id": doc["_id"]},
            {"$set": {"slug": slug}}
        )
        print(f"  ✓ {doc['name']} → {slug}")
        count += 1
    
    print(f"\nMigrated {count} products with slugs.")
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate())
