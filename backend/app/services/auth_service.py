from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import LoginRequest, TokenResponse
from sqlalchemy.orm import Session
from app.database.models import User
from fastapi import HTTPException, status
from app.core.security import verify_password, create_access_token, hash_password
from app.core.config import ACCESS_TOKEN_EXPIRES
from datetime import timedelta

def create_user(user : UserCreate, db : Session):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code= status.HTTP_409_CONFLICT, detail="User with same email id already exist")
    
    new_user = User(name=user.name, email=user.email, hashed_password=hash_password(user.password))

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    
    return UserResponse(id=new_user.id,name=new_user.name, created_at = new_user.created_at,email=new_user.email)
    

def authenticate_user(credentials : LoginRequest, db: Session):
    email = credentials.email
    password = credentials.password

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Wrong Credentials")
    
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Wrong Password")
    
    access_token = create_access_token({"user_id": user.id, "email": user.email},timedelta(minutes=ACCESS_TOKEN_EXPIRES))
    
    return TokenResponse(access_token= access_token, token_type="bearer")