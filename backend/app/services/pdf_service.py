from pathlib import Path
import shutil

from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from pypdf import PdfReader

from app.database.models import Document
from app.schemas.documents import UploadResponse
from app.core.config import PDF_UPLOAD_PATH
from app.services.vectorstore_service import delete_vectors
from app.services.embedding_service import process_document


def upload_pdf_service(file: UploadFile, current_user, db:Session):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files allowed")
    
    pdf_path = save_pdf(file)

    document = Document(filename=file.filename, owner_id = current_user.id)
    db.add(document)
    db.commit()

    text = extract_text(pdf_path)
    process_document(text = text, document_id=document.id)

    return UploadResponse(id = document.id, filename=document.filename, owner_id=document.owner_id, uploaded_at=document.uploaded_at)

    

def documents_service(current_user, db: Session):
    documents = (db.query(Document).filter(Document.owner_id == current_user.id)).all()

    return documents
    
def delete_doc_service(document_id: int, current_user, db: Session):
    document = (db.query(Document).filter(Document.id == document_id)).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    if(document.owner_id != current_user.id):
        raise HTTPException(status_code=403, detail="Access denied")
    
    pdf_path = (PDF_UPLOAD_PATH / document.filename)

    if pdf_path.exists():
        pdf_path.unlink()

    delete_vectors(document.id)
    db.delete(document)
    db.commit()
    
    return {"message": "Document deleted"}


def save_pdf(file: UploadFile) -> Path:
    PDF_UPLOAD_PATH.mkdir(parents=True, exist_ok=True)
    file_path = PDF_UPLOAD_PATH / file.filename

    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return file_path



def extract_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


    