from app.services.vectorstore_service import (
    collection
)

from app.rag.models import embedding_model


def retrieve_context(
    query: str,
    k: int = 5
):

    query_embedding = (
        embedding_model
        .embed_query(query)
    )

    results = collection.query(
        query_embeddings=[
            query_embedding
        ],
        n_results=k
    )

    return results