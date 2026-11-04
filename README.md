# Valentine site (MERN)

Interactive site: "Want to be my Valentine?" with Yes / No, memory photos after each No, then only Yes, then a gallery of memories.

## Stack

- **MongoDB** — memories (photos + captions)
- **Express + Node** — API
- **React (Vite)** — frontend

## Setup

You need Node.js and MongoDB (local or [Atlas](https://www.mongodb.com/atlas)).

### 1. Backend

```bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

API: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

If MongoDB is remote, put that connection string in `backend/.env` as `MONGO_URI`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

The React app talks to the API through `VITE_API_URL` (defaults to `http://localhost:5000`).
