import asyncio
import os
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Ensure we can load from .env
load_dotenv()
MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ubglobal")

# Need auth tools to create admin
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from auth import get_password_hash

async def run_migration():
    if not MONGODB_URL:
        print("MONGODB_URL is not set.")
        return
        
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # 1. Create Default Admin
    admin_exists = await db.admins.find_one({"username": "admin"})
    if not admin_exists:
        print("Creating default admin: admin / admin123")
        await db.admins.insert_one({
            "username": "admin",
            "password": get_password_hash("admin123"),
            "created_at": datetime.now(timezone.utc)
        })
    else:
        print("Admin user already exists.")

    # 2. Seed Banners
    await db.banners.delete_many({}) # Clear existing for clean seed
    banners = [
        {
            "title": "Engineering Materials",
            "description": "Premium steel products — Bright Bars, Black Bars, Alloy & Carbon Steel exported to 50+ countries worldwide.",
            "image": "/images/bright-bars.png",
            "division": "Engineering",
            "cta_text": "Get a Quote",
            "cta_link": "/contact",
            "created_at": datetime.now(timezone.utc)
        },
        {
            "title": "Fruits & Vegetables",
            "description": "APEDA & FSSAI certified export of fresh Alphonso Mangoes, Onions, Pomegranates, Coconut, and more.",
            "image": "/images/hero-bg.png",
            "division": "Agriculture",
            "cta_text": "Get a Quote",
            "cta_link": "/contact",
            "created_at": datetime.now(timezone.utc)
        },
        {
            "title": "IT Services",
            "description": "Web Development, ERP Solutions, Cloud Services, and IT Consultancy for businesses across the globe.",
            "image": "/images/hero-bg.png",
            "division": "IT Services",
            "cta_text": "Get a Quote",
            "cta_link": "/contact",
            "created_at": datetime.now(timezone.utc)
        }
    ]
    await db.banners.insert_many(banners)
    print(f"Seeded {len(banners)} banners.")

    # 3. Seed Products
    await db.products.delete_many({})
    products = [
        # Engineering
        {"name": "Bright Bars", "division": "Engineering", "image": "/images/bright-bars.png", "description": "Precision-finished bright steel bars with superior surface quality for automotive and engineering applications.", "specs": ["EN8, EN9, EN19, EN24", "Diameter: 3mm – 200mm", "Tolerance: h9, h10, h11"], "created_at": datetime.now(timezone.utc)},
        {"name": "Black Bars", "division": "Engineering", "image": "/images/black-bars.png", "description": "Hot-rolled black steel bars with excellent structural integrity for construction and heavy engineering.", "specs": ["MS, EN8, EN9", "Diameter: 10mm – 300mm", "As-rolled finish"], "created_at": datetime.now(timezone.utc)},
        {"name": "Alloy Steel", "division": "Engineering", "image": "/images/alloy-steel.png", "description": "Premium alloy steel grades with enhanced properties for automotive, aerospace, and defense manufacturing.", "specs": ["EN19, EN24, EN31, EN36", "Custom compositions", "Heat-treated options"], "created_at": datetime.now(timezone.utc)},
        {"name": "Carbon Steel", "division": "Engineering", "image": "/images/carbon-steel.png", "description": "High-quality carbon steel in coils, sheets, and bars for general engineering and structural applications.", "specs": ["C45, C55, C60, C70", "Low / Medium / High carbon", "Multiple form factors"], "created_at": datetime.now(timezone.utc)},
        
        # Agriculture
        {"name": "Fresh Fruits", "division": "Agriculture", "image": "/images/hero-bg.png", "description": "Export-quality Alphonso Mangoes, Bananas, Pomegranates, and Coconuts sourced directly from certified farms.", "specs": ["APEDA Certified", "Temperature-controlled logistics", "Custom packaging"], "created_at": datetime.now(timezone.utc)},
        {"name": "Fresh Vegetables", "division": "Agriculture", "image": "/images/hero-bg.png", "description": "Premium Onions, Drumsticks, and seasonal vegetables with strict FSSAI compliance and freshness guarantees.", "specs": ["FSSAI Certified", "Direct farm sourcing", "Sorted and graded"], "created_at": datetime.now(timezone.utc)},
        {"name": "Indian Spices", "division": "Agriculture", "image": "/images/hero-bg.png", "description": "Authentic G4 Chilli, Turmeric, and whole spices processed under stringent hygiene conditions for global export.", "specs": ["Whole & Ground", "High active compound", "Export packaging"], "created_at": datetime.now(timezone.utc)},
        
        # IT Services
        {"name": "Web Development", "division": "IT Services", "image": "/images/hero-bg.png", "description": "Custom, high-performance web applications using modern frameworks like React, Next.js, and Node.js.", "specs": ["React / Next.js / Vue", "Responsive Design", "SEO Optimized"], "created_at": datetime.now(timezone.utc)},
        {"name": "ERP Solutions", "division": "IT Services", "image": "/images/hero-bg.png", "description": "Tailored Enterprise Resource Planning software to streamline operations, inventory, and HR.", "specs": ["Custom Workflows", "Integration APIs", "Real-time Analytics"], "created_at": datetime.now(timezone.utc)},
        {"name": "Cloud & DevOps", "division": "IT Services", "image": "/images/hero-bg.png", "description": "Scalable cloud infrastructure and automated CI/CD pipelines on AWS, Google Cloud, and Azure.", "specs": ["AWS / GCP / Azure", "Docker / Kubernetes", "CI/CD Automation"], "created_at": datetime.now(timezone.utc)},
    ]
    await db.products.insert_many(products)
    print(f"Seeded {len(products)} products.")
    
    # 4. Seed Blogs
    await db.blogs.delete_many({})
    blogs = [
        {
            "slug": "top-5-steel-grades-for-automotive-manufacturing",
            "title": "Top 5 Steel Grades for Automotive Manufacturing in 2026",
            "date": datetime.strptime("2026-05-12", "%Y-%m-%d").replace(tzinfo=timezone.utc),
            "category": "Engineering",
            "image": "/images/alloy-steel.png",
            "content": "### Introduction\n\nThe automotive industry is undergoing a massive transformation with the shift towards electric vehicles (EVs). Lightweighting is more critical than ever to maximize battery range, but safety and structural integrity cannot be compromised. This has led to a surge in demand for advanced steel grades.\n\n### 1. Advanced High-Strength Steel (AHSS)\n\nAHSS is revolutionizing vehicle frames. By offering superior strength-to-weight ratios, manufacturers can use thinner gauges of steel without sacrificing crash performance. This directly contributes to lighter, more efficient vehicles.\n\n### 2. EN24 Alloy Steel\n\nFor high-stress components like gears, shafts, and axles, EN24 remains a top choice. Its excellent tensile strength and shock resistance make it indispensable in heavy-duty commercial vehicles and high-performance cars.\n\n### 3. Boron Steel\n\nUsed heavily in critical safety areas like B-pillars and door intrusion beams, boron steel is hot-stamped to achieve extreme hardness. It provides the rigid survival space necessary for passenger safety in modern crash tests.\n\n### Conclusion\n\nChoosing the right steel grade is a complex balance of weight, cost, formability, and safety. At UBGlobal, our engineering division supplies fully certified, mill-direct steel tailored for the exacting standards of global automotive manufacturing.",
            "author": "UBGlobal Engineering",
            "created_at": datetime.now(timezone.utc)
        },
        {
            "slug": "indias-mango-export-season-2026-what-importers-need-to-know",
            "title": "India's Mango Export Season 2026: What Importers Need to Know",
            "date": datetime.strptime("2026-04-28", "%Y-%m-%d").replace(tzinfo=timezone.utc),
            "category": "Agriculture",
            "image": "/images/hero-bg.png",
            "content": "### The King of Fruits Returns\n\nAs the 2026 season approaches, global demand for Indian mangoes—particularly the Alphonso and Kesar varieties—is expected to break previous records. For international importers, preparation is key to securing premium quality produce.\n\n### Certification and Compliance\n\nImport regulations in markets like the EU, USA, and Japan have become increasingly stringent. Importers must partner with exporters who hold valid **APEDA** and **FSSAI** certifications.\n\n* **Vapor Heat Treatment (VHT):** Mandatory for several countries to eliminate fruit flies without chemicals.\n* **Hot Water Treatment:** Often required for Middle Eastern markets.\n\n### Logistics and Cold Chain\n\nMangoes are highly perishable. The success of an export shipment relies entirely on an unbroken cold chain. From farm-level pre-cooling to temperature-controlled air freight, maintaining a consistent 10-12°C is non-negotiable.\n\n### Why UBGlobal?\n\nOur Agriculture division works directly with certified orchards in Maharashtra and Gujarat. We oversee the entire process: harvesting at the perfect Brix level, sorting, compliance treatment, and specialized export packaging. Contact us early to secure your volumes for the upcoming season.",
            "author": "UBGlobal Agriculture",
            "created_at": datetime.now(timezone.utc)
        },
        {
            "slug": "why-custom-erp-is-better-than-off-the-shelf",
            "title": "Custom ERP vs. Off-the-Shelf: Why Manufacturing Businesses Need Tailored Solutions",
            "date": datetime.strptime("2026-06-05", "%Y-%m-%d").replace(tzinfo=timezone.utc),
            "category": "IT Services",
            "image": "/images/hero-bg.png",
            "content": "### The Software Dilemma\n\nFor growing manufacturing and trading companies, managing inventory, supply chains, and HR through spreadsheets quickly becomes a bottleneck. The choice then arises: buy an off-the-shelf ERP (like SAP or Oracle) or build a custom solution.\n\n### The Problem with Off-the-Shelf\n\n1. **Paying for Unused Features:** Enterprise software is bloated. You often pay hefty licensing fees for modules your business will never use.\n2. **Rigid Workflows:** Instead of the software adapting to your business, your business has to adapt to the software's rigid workflows.\n3. **Scaling Costs:** Adding new users often requires expensive license upgrades.\n\n### The Custom Advantage\n\n* **Perfect Fit:** A custom ERP is built around your specific operational nuances. If you have a unique quality control process for steel exports, the software reflects that exactly.\n* **No Recurring Licenses:** You own the software. There are no per-user monthly fees, making it highly cost-effective as your team grows.\n* **Seamless Integration:** It can easily integrate with your existing legacy systems or specialized machinery software.\n\n### Getting Started\n\nAt UBGlobal IT Services, we specialize in building lightweight, cloud-native ERPs using modern tech stacks (React, Node.js) that are fast, secure, and infinitely scalable.",
            "author": "UBGlobal IT Services",
            "created_at": datetime.now(timezone.utc)
        }
    ]
    await db.blogs.insert_many(blogs)
    print(f"Seeded {len(blogs)} blogs.")
    
    print("Migration complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(run_migration())
