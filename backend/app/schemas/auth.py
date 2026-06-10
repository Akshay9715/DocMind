from pydantic import BaseModel, EmailStr





class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    token_type: str = "bearer"
    access_token: str