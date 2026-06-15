import chromadb

client = chromadb.PersistentClient(path="app/storage/vectors")

collection = (client.get_or_create_collection("documents"))



def store_vectors(document_id: int, chunks: list[str], embeddings: list):
    
    ids = [f"{document_id}_{i}" for i in range(len(chunks))]

    collection.add(
    ids=ids,
    documents=chunks,
    embeddings=embeddings,
    metadatas=[
        {
            "document_id": document_id
        }
        for _ in chunks
    ]
)
    


def delete_vectors(document_id : int):
    results = collection.get()

    ids = [id_ for id_ in results["ids"] if id_.startswith(f"{document_id}_")]

    if ids:
        collection.delete(ids=ids)
    return