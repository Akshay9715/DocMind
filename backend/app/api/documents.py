from fastapi import APIRouter, Depends, UploadFile, File

from sqlalchemy.orm import Session
from app.schemas.user import  UserResponse
from app.dependencies.auth import get_current_user

from app.services.pdf_service import upload_pdf_service, documents_service, delete_doc_service

router = APIRouter(tags=["documents"])


@router.post("/upload")
def upload_doc(doc: UploadFile = File(...), current_user: UserResponse = Depends(get_current_user)):
    return upload_pdf_service(doc, current_user)

@router.get("/")
def documents(current_user: Session = Depends(get_current_user)):
    return documents_service(current_user)


@router.delete("/{id}")
def deleted_doc(doc_id: int,current_user: Session = Depends(get_current_user)):
    return delete_doc_service(doc_id, current_user)

