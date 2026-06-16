from fastapi import FastAPI, APIRouter
from app.database.database import Base, engine
from app.api.auth import router as auth_router
from app.api.documents import router as document_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router
Base.metadata.create_all(bind=engine)
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # List of allowed origins
    allow_credentials=True,         # Allow cookies/auth headers
    allow_methods=["*"],            # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allow all headers
)


app.include_router(
    auth_router,
    prefix="/auth"
)
app.include_router(
    chat_router,
    prefix="/chat",
    tags=['authentication']
)
app.include_router(
    document_router,
    prefix="/documents"
)

@app.get("/")
def health():
    return {"status": "ok"}
