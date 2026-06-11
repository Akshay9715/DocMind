from fastapi import FastAPI, APIRouter
from app.database.database import Base, engine
from app.api.auth import router as auth_router

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(
    auth_router,
    prefix="/auth"
)
# app.include_router(
#     chat_router,
#     prefix=['auth/'],
#     tags=['authentication']
# )
# app.include_router(
#     document_router,
#     prefix=['auth/'],
#     tags=['authentication']
# )
