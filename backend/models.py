import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)