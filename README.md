# MERN POS System

This workspace contains a simple MERN POS (Point of Sale) system with backend (Express + MongoDB) and frontend (React + Vite).
![My Photo](image.png)

Folders:
- `backend/` - Express API
- `frontend/` - React app (Vite)

Quick run (in VS Code terminals):

1. Start MongoDB (e.g., locally or via Docker). Default URL: `mongodb://localhost:27017/pos_db`.

2. Backend:

```powershell
cd "c:\pos 2\backend"
npm install
copy .env.example .env
# edit .env if needed
npm start
```

3. Frontend (new terminal):

```powershell
cd "c:\pos 2\frontend"
npm install
npm start
```

4. Open browser: `http://localhost:5173` (Vite default). Login with seeded admin: `admin@pos.local` / `admin123`.
