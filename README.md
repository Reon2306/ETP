# Reiken – Retrieval‑Augmented Study Assistant

A full‑stack app that ingests your study notes and question papers, retrieves relevant context, and uses a local LLM (Ollama) to generate concise answers and a downloadable Q&A PDF.

- Client: React + Vite + Tailwind
- Server: Node.js (Express), Prisma (PostgreSQL), SQLite vector store
- LLM/Embeddings: Ollama (local)

---

## Features
- Upload notes (PDF/DOCX/TXT) and question papers.
- Chunk + embed notes into a local vector store.
- Retrieve top‑k chunks per question and generate answers via a local LLM.
- Export answers as a PDF.
- Basic signup/login (demo only).

---

## Prerequisites
- Node.js 18+ and npm
- A PostgreSQL database (local or hosted like Neon)
- [Ollama](https://ollama.com) installed and running
- Windows/macOS/Linux supported (commands below use a POSIX shell)

---

## Quick Start (Local)

### 1) Clone and install
```bash
# from a terminal
cd ETP

# install server deps
cd server
npm install

# install client deps
cd ../client
npm install
```

### 2) Configure environment
Create `server/.env` with at least:
```bash
# server/.env
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/etp?schema=public
# Ollama
OLLAMA_URL=http://localhost:11434
# Choose models you have locally
EMBED_MODEL=nomic-embed-text     # or nomic/embedding-text depending on your setup
LLM_MODEL=llama3                 # e.g. llama3 or llama3.2
# RAG chunking
CHUNK_SIZE=800
CHUNK_OVERLAP=100
```

Create `client/.env`:
```bash
# client/.env
VITE_API_URL=http://localhost:3000
```

Ensure the upload temp directory exists (already in repo): `server/uploads/tmp/`.

### 3) Prepare Prisma (database)
```bash
cd server
npx prisma generate
# For a new database, create initial tables
npx prisma migrate dev --name init
```

The app currently uses a single table `User` for demo auth.

### 4) Start Ollama and prepare models
```bash
# Terminal A: start the Ollama server (keep this running)
ollama serve
```

```bash
# Terminal B: pull the models you plan to use
ollama pull nomic-embed-text   # embeddings model (or your chosen embed model)
ollama pull llama3             # LLM (or llama3.2, etc.)
```

Optional verification:
```bash
curl -s http://localhost:11434/api/version
curl -s http://localhost:11434/api/tags
```

If you use different model names, update `EMBED_MODEL` and `LLM_MODEL` in `server/.env`.

### 5) Run the servers
```bash
# server (Express)
cd server
npm start
# -> starts on http://localhost:3000

# client (Vite)
cd ../client
npm run dev
# -> opens on http://localhost:5173 (default)
```

Open the client in your browser. The client calls the server via `VITE_API_URL`.

---

## Usage Flow
1) Sign up and log in (demo auth).
2) Navigate to Upload page.
3) Upload Notes (PDF/DOCX/TXT). Wait for status showing chunk count.
4) Upload Questions (PDF/DOCX/TXT). Wait for detected questions count.
5) Click “Generate PDF” to download Q&A results.

Optional: Use the Search page to try a question interactively (UI may be static depending on current wiring).

---

## API Overview (Server)
- Auth: `/api/signup`, `/api/login`
- RAG: `/rag/upload-notes`, `/rag/upload-questions`, `/rag/generate`
- Health: `/health`

See `docs/ProjectReport.md` for detailed specifications.

---

## Project Structure
```
client/               # React + Vite app
  src/
    components/       # Landing + Dashboard views
    context/          # API context
server/               # Express API
  controllers/        # auth + model controllers
  routes/             # /api and /rag routes
  utils/              # RAG engine, file extractors, PDF gen
  prisma/             # Prisma schema
  uploads/tmp/        # temp upload dir
  server.js           # app entry
docs/
  ProjectReport.md    # architecture, APIs, and test plan
```

---

## Environment Variables
Server (`server/.env`):
- `PORT` (default 3000)
- `DATABASE_URL` (PostgreSQL connection string)
- `OLLAMA_URL` (default `http://localhost:11434`)
- `EMBED_MODEL` (e.g., `nomic-embed-text` or `nomic/embedding-text`)
- `LLM_MODEL` (e.g., `llama3`)
- `CHUNK_SIZE` (default 800), `CHUNK_OVERLAP` (default 100)

Client (`client/.env`):
- `VITE_API_URL` (server base URL, e.g., `http://localhost:3000`)

---

## Troubleshooting
- Embedding/LLM errors: Ensure Ollama is running and the models are pulled. Check `OLLAMA_URL`, `EMBED_MODEL`, `LLM_MODEL`.
- Generate fails with 400: Upload notes and questions first.
- Large/empty documents: Verify file size (< 40MB) and that text extraction works (PDFs with only images may extract poorly).
- Auth not secure: Current demo stores plain‑text passwords and uses a relaxed login predicate. Do not use in production.
- Prisma migration errors: Confirm `DATABASE_URL` is reachable and the database exists; rerun `npx prisma migrate dev`.

---

## Production Notes (High‑Level)
- Use a managed Postgres (e.g., Neon) and set `DATABASE_URL` accordingly.
- Consider a dedicated vector DB (pgvector/FAISS) for scale.
- Add password hashing (bcrypt) and JWT sessions.
- Serve client with a static host (Vercel/Netlify) and the server on a host with Ollama access.

---

## License
For academic/demo use. Replace with your license as needed.
