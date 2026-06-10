from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from app.core.config import *

chatbot = ChatGoogleGenerativeAI(
    model = "gemini-2.5-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0.5,
)

embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=GEMINI_API_KEY
)


