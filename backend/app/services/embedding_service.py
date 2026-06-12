from app.rag.models import embedding_model
from app.rag.models import chatbot

def process_document(text: str, document_id: int):

    from app.services.embedding_service import generate_embeddings
    from app.services.vectorstore_service import store_vectors
    
    chunks = [text[i:i+1000] for i in range(0,len(text),1000)]

    embeddings = (generate_embeddings(chunks))

    store_vectors(document_id=document_id, chunks = chunks, embeddings = embeddings)


def generate_embeddings(chunks: list[str]):
    return (embedding_model.embed_documents(chunks))