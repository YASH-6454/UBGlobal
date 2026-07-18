from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("DATABASE_NAME")]

banner = db.banners.find_one()
if banner:
    db.banners.update_one(
        {"_id": banner["_id"]},
        {"$set": {
            "title": "Engineering.\nAgriculture.\nTechnology.",
            "title_color": "#ffffff",
            "title_color_2": "#ff9800",
            "title_color_3": "#00bcd4",
        }}
    )
    print("Formatted banner with newlines and colors")
