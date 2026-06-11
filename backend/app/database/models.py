from sqlalchemy import (
    Column,
    String,
    Integer,
    Text,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship

from app.database.database import Base

from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)

    email = Column(
        String(255),
        nullable=False,
        unique=True,
        index=True
    )

    hashed_password = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    documents = relationship(
        "Document",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    chat_sessions = relationship(
        "ChatSession",
        back_populates="user",
        cascade="all, delete-orphan"
    )


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(
        String(255),
        nullable=False
    )

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    owner = relationship(
        "User",
        back_populates="documents"
    )


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="chat_sessions"
    )

    messages = relationship(
        "Message",
        back_populates="chat_session",
        cascade="all, delete-orphan"
    )


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(
        Integer,
        ForeignKey("chat_sessions.id"),
        nullable=False
    )

    role = Column(
        String(50),
        nullable=False
    )

    content = Column(
        Text,
        nullable=False
    )

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )

    chat_session = relationship(
        "ChatSession",
        back_populates="messages"
    )