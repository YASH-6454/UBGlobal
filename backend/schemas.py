from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timezone


class ContactCreate(BaseModel):
    """Schema for creating a new contact inquiry."""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    """Schema for returning a contact inquiry."""
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime


class HealthResponse(BaseModel):
    """Schema for the health check endpoint."""
    status: str
    message: str
    database: str

# --- CMS Schemas ---

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AdminCreate(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    id: str
    username: str
    created_at: datetime

class ProductCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    division: str
    description: str
    specs: list[str] = []
    image: Optional[str] = None
    category: Optional[str] = None
    emoji: Optional[str] = None

class ProductResponse(ProductCreate):
    id: str
    created_at: datetime

class BlogCreate(BaseModel):
    title: str
    slug: str
    category: str
    content: str
    image: Optional[str] = None
    author: Optional[str] = "UBGlobal Admin"

class BlogResponse(BlogCreate):
    id: str
    date: datetime
    created_at: datetime

class BannerCreate(BaseModel):
    title: str
    description: str
    image: str
    division: Optional[str] = None
    cta_text: Optional[str] = None
    cta_link: Optional[str] = None
    title_color: Optional[str] = None
    title_color_2: Optional[str] = None
    title_color_3: Optional[str] = None
    description_color: Optional[str] = None

class BannerResponse(BannerCreate):
    id: str
    created_at: datetime
