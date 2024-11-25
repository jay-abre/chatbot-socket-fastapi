from app.models.schemas import Message
class ChatService:
    def process_message(self, message: str, sender_id: str) -> Message:
        # Process the message and return a structured response
        return Message(sender_id=sender_id, message=message)