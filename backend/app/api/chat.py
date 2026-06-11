from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session
from app.schemas.chat import QuestionRequest, ChatResponse

from app.services.chat_service import chat_service, chat_history_service 
from app.dependencies.auth import get_current_user

router = APIRouter(tags=["Chat"])


@router.post("/", response_model=ChatResponse)
def chat(query : QuestionRequest, current_user=Depends(get_current_user)):
    return chat_service(query,current_user)

@router.get("history/{session_id}")
def chat_history(session_id: int, current_user: Session = Depends(get_current_user)):
    return chat_history_service(session_id, current_user)