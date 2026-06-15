from sqlalchemy.orm import Session

from app.rag.models import chatbot

from app.core.config import (
    GEMINI_API_KEY
)

from app.rag.prompts import (
    RAG_PROMPT
)

from app.services.retrieval_service import (
    retrieve_context
)

from app.database.models import (
    ChatSession,
    Message
)


def chat_service(
    query,
    current_user,
    db: Session
):

    results = retrieve_context(
        query.query
    )

    documents = (
        results["documents"][0]
    )

    context = "\n\n".join(
        documents
    )

    prompt = RAG_PROMPT.format(
        context=context,
        question=query.query
    )

    response = chatbot.invoke(
        prompt
    )

    session = ChatSession(
        user_id=current_user.id
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    user_message = Message(
        session_id=session.id,
        role="user",
        content=query.query
    )

    assistant_message = Message(
        session_id=session.id,
        role="assistant",
        content=response.content
    )

    db.add(user_message)
    db.add(assistant_message)

    db.commit()

    return {
        "query": query.query,
        "answer": response.content
    }

def chat_history_service(
    session_id: int,
    current_user,
    db: Session
):

    session = (
        db.query(ChatSession)
        .filter(
            ChatSession.id
            == session_id,
            ChatSession.user_id
            == current_user.id
        )
        .first()
    )

    if not session:
        return []

    messages = (
        db.query(Message)
        .filter(
            Message.session_id
            == session_id
        )
        .all()
    )

    return messages