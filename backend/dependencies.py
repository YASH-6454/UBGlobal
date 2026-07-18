from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from auth import verify_token
from database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/login")

async def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception
        
    username: str = payload.get("username")
    if username is None:
        raise credentials_exception
        
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
        
    admin = await db.admins.find_one({"username": username})
    if admin is None:
        raise credentials_exception
        
    return admin
