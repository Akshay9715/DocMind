import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
JWT_SECRET = os.getenv("JWT_SECRET")
DATABASE_URL = os.getenv("DATABASE_URL")


VECTOR_DB_PATH=BASE_DIR / "storage" / "vectors"

PDF_UPLOAD_PATH= BASE_DIR / "storage" / "pdfs"

ENCRYPTION_ALGORITHM= os.getenv("ENCRYPTION_ALGORITHM","HS256")

ACCESS_TOKEN_EXPIRES = int(os.getenv("ACCESS_TOKEN_EXPIRES", 30))