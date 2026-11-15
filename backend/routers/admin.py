from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from database import get_db
from auth import verify_password, create_access_token, get_password_hash
from dependencies import get_current_admin
from ratelimit import check_rate_limit, client_ip
from schemas import Token, PasswordChange

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.post("/login", response_model=Token)
async def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    # Max 10 login attempts per IP per 15 minutes (slows down password guessing)
    check_rate_limit(f"login:{client_ip(request)}", max_hits=10, window_seconds=900)

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


@router.post("/change-password")
async def change_password(
    body: PasswordChange,
    request: Request,
    admin: dict = Depends(get_current_admin),
):
    """Change the logged-in admin's password."""
    check_rate_limit(f"chpw:{client_ip(request)}", max_hits=5, window_seconds=900)

    if not verify_password(body.current_password, admin["password"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    if body.new_password == body.current_password:
        raise HTTPException(status_code=400, detail="New password must be different")

    db = get_db()
    await db.admins.update_one(
        {"_id": admin["_id"]},
        {"$set": {"password": get_password_hash(body.new_password)}},
    )
    return {"message": "Password updated"}
