from fastapi import APIRouter, Depends, UploadFile, File

from sqlalchemy.orm import Session
from app.schemas.user import  UserResponse
from app.dependencies.auth import get_current_user, get_db
from app.database.models import User

from app.services.pdf_service import upload_pdf_service, documents_service, delete_doc_service

router = APIRouter(tags=["documents"])


@router.post("/upload")
def upload_doc(doc: UploadFile = File(...), current_user: UserResponse = Depends(get_current_user), db: Session = Depends(get_db)):
    return upload_pdf_service(doc, current_user,db)

@router.get("/")
def documents(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return documents_service(current_user,db)


@router.delete("/{doc_id}")
def deleted_doc(doc_id: int,current_user: User = Depends(get_current_user), db : Session = Depends(get_db)):
    return delete_doc_service(doc_id, current_user,db)

