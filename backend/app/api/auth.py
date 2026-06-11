from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db

from app.schemas.user import UserCreate, UserResponse

from app.schemas.auth import TokenResponse, LoginRequest
from app.dependencies.auth import get_current_user
from app.services.auth_service import create_user, authenticate_user

router = APIRouter(tags=["Auth"])


@router.post("/register", response_model=UserResponse)
def register(user:UserCreate,db: Session = Depends(get_db)):
    return create_user(user,db)

@router.post("/login",response_model=TokenResponse)
def login(credentials : LoginRequest, db: Session = Depends(get_db)):
    return authenticate_user(credentials,db)

@router.get("/profile",response_model=UserResponse)
def profile(current_user: Session = Depends(get_current_user)):
    return current_user