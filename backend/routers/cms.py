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

from bson import ObjectId
from bson.errors import InvalidId

router = APIRouter(prefix="/api", tags=["cms"])

def parse_object_id(id_str: str) -> ObjectId:
    """Safely convert string to ObjectId or raise 400 Bad Request."""
    try:
        return ObjectId(id_str)
    except (InvalidId, TypeError):
        raise HTTPException(status_code=400, detail="Invalid ID format")

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
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
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
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    doc = await db.products.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    doc["id"] = str(doc.pop("_id"))
    return doc

@router.post("/products", response_model=ProductResponse)
async def create_product(product: ProductCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    doc = product.dict()
    # Auto-generate slug from name if not provided
    if not doc.get("slug"):
        doc["slug"] = generate_slug(doc["name"])
    # Ensure slug is unique
    base_slug = doc["slug"]
    counter = 1
    while await db.products.find_one({"slug": doc["slug"]}):
        doc["slug"] = f"{base_slug}-{counter}"
        counter += 1
    doc["created_at"] = datetime.now(timezone.utc)
    
    result = await db.products.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

@router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, product: ProductCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    obj_id = parse_object_id(product_id)
    doc = product.dict()
    # Auto-generate slug from name if not provided
    if not doc.get("slug"):
        doc["slug"] = generate_slug(doc["name"])
    # Ensure slug is unique (excluding current product)
    base_slug = doc["slug"]
    counter = 1
    while await db.products.find_one({"slug": doc["slug"], "_id": {"$ne": obj_id}}):
        doc["slug"] = f"{base_slug}-{counter}"
        counter += 1
    
    result = await db.products.update_one(
        {"_id": obj_id},
        {"$set": doc}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
        
    updated_doc = await db.products.find_one({"_id": obj_id})
    updated_doc["id"] = str(updated_doc.pop("_id"))
    return updated_doc

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    obj_id = parse_object_id(product_id)
    result = await db.products.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "deleted"}

# --- Blogs ---

@router.get("/blogs", response_model=List[BlogResponse])
async def get_blogs():
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    blogs = []
    async for doc in db.blogs.find().sort("date", -1):
        doc["id"] = str(doc.pop("_id"))
        blogs.append(doc)
    return blogs

@router.get("/blogs/{slug}", response_model=BlogResponse)
async def get_blog_by_slug(slug: str):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    doc = await db.blogs.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Blog not found")
    doc["id"] = str(doc.pop("_id"))
    return doc

@router.post("/blogs", response_model=BlogResponse)
async def create_blog(blog: BlogCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    # Check if slug exists
    if await db.blogs.find_one({"slug": blog.slug}):
        raise HTTPException(status_code=400, detail="Slug already exists")
        
    doc = blog.dict()
    doc["created_at"] = datetime.now(timezone.utc)
    doc["date"] = datetime.now(timezone.utc)
    
    result = await db.blogs.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

@router.put("/blogs/{blog_id}", response_model=BlogResponse)
async def update_blog(blog_id: str, blog: BlogCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    obj_id = parse_object_id(blog_id)
    doc = blog.dict()
    # Ensure slug is unique (excluding current blog)
    existing = await db.blogs.find_one({"slug": doc["slug"], "_id": {"$ne": obj_id}})
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    result = await db.blogs.update_one(
        {"_id": obj_id},
        {"$set": doc}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
        
    updated_doc = await db.blogs.find_one({"_id": obj_id})
    updated_doc["id"] = str(updated_doc.pop("_id"))
    return updated_doc

@router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    obj_id = parse_object_id(blog_id)
    result = await db.blogs.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"status": "deleted"}

# --- Banners ---

@router.get("/banners", response_model=List[BannerResponse])
async def get_banners():
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    banners = []
    async for doc in db.banners.find().sort("created_at", -1):
        doc["id"] = str(doc.pop("_id"))
        banners.append(doc)
    return banners

@router.post("/banners", response_model=BannerResponse)
async def create_banner(banner: BannerCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    doc = banner.dict()
    doc["created_at"] = datetime.now(timezone.utc)
    
    result = await db.banners.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    return doc

@router.put("/banners/{banner_id}", response_model=BannerResponse)
async def update_banner(banner_id: str, banner: BannerCreate, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    obj_id = parse_object_id(banner_id)
    doc = banner.dict()
    
    result = await db.banners.update_one(
        {"_id": obj_id},
        {"$set": doc}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
        
    updated_doc = await db.banners.find_one({"_id": obj_id})
    updated_doc["id"] = str(updated_doc.pop("_id"))
    return updated_doc

@router.delete("/banners/{banner_id}")
async def delete_banner(banner_id: str, admin: dict = Depends(get_current_admin)):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
    obj_id = parse_object_id(banner_id)
    result = await db.banners.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
    return {"status": "deleted"}
