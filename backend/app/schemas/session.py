from pydantic import BaseModel
from datetime import datetime

class ChatSessionResponse(BaseModel):
    id: int
    user_id: int
    created_at: datetime

    model_config: {"from_attributes": True}