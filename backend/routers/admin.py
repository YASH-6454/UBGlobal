from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from database import get_db
from auth import verify_password, create_access_token
from schemas import Token

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")
        
    admin = await db.admins.find_one({"username": form_data.username})
    if not admin or not verify_password(form_data.password, admin["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"username": admin["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
