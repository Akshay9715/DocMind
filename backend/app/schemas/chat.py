from pydantic import BaseModel
from datetime import datetime
from typing import List

class QuestionRequest(BaseModel):
    query: str


class CitationResponse(BaseModel):
    document_id: int
    filename: str
    page_number: int


class ChatResponse(BaseModel):
    query: str
    answer: str
    citations: List[CitationResponse]
