from pydantic import BaseModel
from datetime import datetime

class MessageResponse(BaseModel):
    id: int
    session_id: int
    role: str
    content: str
    timestamp: datetime

    model_config: {"from_attributes": True}