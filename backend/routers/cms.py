import re
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime, timezone
from bson import ObjectId
from database import get_db
from dependencies import get_current_admin
from schemas import (
    ProductCreate, ProductResponse,
    BlogCreate, BlogResponse,
    BannerCreate, BannerResponse
)

router = APIRouter(prefix="/api", tags=["cms"])

def generate_slug(name: str) -> str:
    """Generate a URL-friendly slug from a product name."""
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

# --- Products ---

@router.get("/products", response_model=List[ProductResponse])
async def get_products(division: Optional[str] = None):
    db = get_db()
    query = {}
    if division:
        query["division"] = division
        
    products = []
    async for doc in db.products.find(query).sort("created_at", -1):
        doc["id"] = str(doc.pop("_id"))
        products.append(doc)
    return products

@router.get("/products/by-slug/{slug}", response_model=ProductResponse)
async def get_product_by_slug(slug: str):
    db = get_db()
    doc = await db.products.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    doc["id"] = str(doc.pop("_id"))
    return doc

@router.post("/products", response_model=ProductResponse)
async def create_product(product: ProductCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    doc = product.dict()
    # Auto-generate slug from name if not provided
    if not doc.get("slug"):
        doc["slug"] = generate_slug(doc["name"])
    doc["created_at"] = datetime.now(timezone.utc)
    
    result = await db.products.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(get_current_admin)):
    db = get_db()
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "deleted"}

# --- Blogs ---

@router.get("/blogs", response_model=List[BlogResponse])
async def get_blogs():
    db = get_db()
    blogs = []
    async for doc in db.blogs.find().sort("date", -1):
        doc["id"] = str(doc.pop("_id"))
        blogs.append(doc)
    return blogs

@router.get("/blogs/{slug}", response_model=BlogResponse)
async def get_blog_by_slug(slug: str):
    db = get_db()
    doc = await db.blogs.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Blog not found")
    doc["id"] = str(doc.pop("_id"))
    return doc

@router.post("/blogs", response_model=BlogResponse)
async def create_blog(blog: BlogCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    # Check if slug exists
    if await db.blogs.find_one({"slug": blog.slug}):
        raise HTTPException(status_code=400, detail="Slug already exists")
        
    doc = blog.dict()
    doc["created_at"] = datetime.now(timezone.utc)
    doc["date"] = datetime.now(timezone.utc)
    
    result = await db.blogs.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

@router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str, admin: dict = Depends(get_current_admin)):
    db = get_db()
    result = await db.blogs.delete_one({"_id": ObjectId(blog_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"status": "deleted"}

# --- Banners ---

@router.get("/banners", response_model=List[BannerResponse])
async def get_banners():
    db = get_db()
    banners = []
    async for doc in db.banners.find().sort("created_at", -1):
        doc["id"] = str(doc.pop("_id"))
        banners.append(doc)
    return banners

@router.post("/banners", response_model=BannerResponse)
async def create_banner(banner: BannerCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    doc = banner.dict()
    doc["created_at"] = datetime.now(timezone.utc)
    
    result = await db.banners.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

@router.put("/banners/{banner_id}", response_model=BannerResponse)
async def update_banner(banner_id: str, banner: BannerCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    doc = banner.dict()
    
    result = await db.banners.update_one(
        {"_id": ObjectId(banner_id)},
        {"$set": doc}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
        
    updated_doc = await db.banners.find_one({"_id": ObjectId(banner_id)})
    updated_doc["id"] = str(updated_doc.pop("_id"))
    return updated_doc

@router.delete("/banners/{banner_id}")
async def delete_banner(banner_id: str, admin: dict = Depends(get_current_admin)):
    db = get_db()
    result = await db.banners.delete_one({"_id": ObjectId(banner_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
    return {"status": "deleted"}
