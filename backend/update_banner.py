from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("DATABASE_NAME")]

# Get the first banner
banner = db.banners.find_one()

if banner:
    db.banners.update_one(
        {"_id": banner["_id"]},
        {"$set": {
            "title": "Engineering. Agriculture. Technology.",
            "description": "United Brothers Global — a diversified trading and services company delivering premium engineering materials, fresh produce, and IT solutions across 50+ countries."
        }}
    )
    print("Successfully updated the main banner to be a global umbrella banner!")
else:
    print("No banners found.")
