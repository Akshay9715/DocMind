# DocMind

DocMind is an AI-powered document intelligence platform that enables users to upload, analyze, search, and interact with documents through a modern web interface. Built with **React** for the frontend and **FastAPI** for the backend, DocMind provides fast, scalable, and intuitive document management and knowledge extraction capabilities.

---

## 🚀 Features

* 📄 Upload and manage documents
* 🔍 Semantic search across document content
* 🤖 AI-powered question answering
* 📝 Document summarization
* 🏷️ Metadata extraction and organization
* ⚡ Fast and responsive user interface
* 🔐 Secure API architecture
* 📊 Real-time document processing status

---

## 🏗️ Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS / Material UI
### Backend

* FastAPI
* Pydantic
* Uvicorn
* SQLAlchemy 
* SQLite
  
### AI & Document Processing

* OpenAI / LLM Integration
* Vector Database (ChromaDB)
* PDF/Text Processing Libraries

---

## 📁 Project Structure

```bash
docmind/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

* Node.js (v18+)
* Python (v3.10+)
* Git

---

### Clone Repository

```bash
git clone https://github.com/your-username/docmind.git
cd docmind
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

## Backend Setup

Create a virtual environment:

```bash
cd backend

python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend API will be available at:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
G_API_KEY=your_api_key
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```


---

## 🔄 API Flow

1. User uploads a document from React frontend.
2. File is sent to FastAPI backend.
3. Backend processes and extracts content.
4. Document embeddings are generated and stored.
5. User queries are matched against document knowledge.
6. AI-generated responses are returned to the frontend.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.


**DocMind** — Transforming documents into actionable knowledge.
