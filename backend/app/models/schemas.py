from pydantic import BaseModel

class Message(BaseModel):
    sender_id: str
    message: str