from pydantic import BaseModel
from datetime import datetime



class DocumentResponse(BaseModel):
    id: int
    filename: str
    owner_id: int
    uploaded_at: datetime

    model_config: {"from_attributes":True}

class UploadResponse(BaseModel):
    pass
