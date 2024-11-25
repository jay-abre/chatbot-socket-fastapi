from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Chat Application"
    websocket_url: str = "/ws/chat"
    cors_origins: list = ["http://localhost:8000"]

settings = Settings()