from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.chat_service import ChatService
from app.utils.connection_manager import ConnectionManager
from app.models.schemas import Message
import logging

router = APIRouter()
chat_service = ChatService()
connection_manager = ConnectionManager()

@router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    session_id = await connection_manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            response = chat_service.process_message(data, session_id)
            await connection_manager.broadcast(response.dict(), sender_id=session_id)
    except WebSocketDisconnect:
        connection_manager.disconnect(session_id)
    except Exception as e:
        logging.error(f"Error: {e}")
        connection_manager.disconnect(session_id)