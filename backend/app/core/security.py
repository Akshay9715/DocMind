from passlib.context import CryptContext
from datetime import datetime, timedelta
from app.core.config import ENCRYPTION_ALGORITHM, ACCESS_TOKEN_EXPIRES, JWT_SECRET
import jwt



pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str)-> str:
    hashed_password = pwd_context.hash(password)
    return hashed_password


def verify_password(password: str, hashed_password: str)->bool:
    return pwd_context.verify(password, hashed_password)

def create_access_token(doc:dict, expires: timedelta = timedelta(minutes=30)) -> str:
    to_encode = doc.copy()
    expire = datetime.now() + expires if expires else datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    access_token = jwt.encode(to_encode,JWT_SECRET, algorithm=ENCRYPTION_ALGORITHM)

    return access_token

def decode_access_token(token: str):

    payload = jwt.decode(token, JWT_SECRET, algorithms=[ENCRYPTION_ALGORITHM])

    return payload