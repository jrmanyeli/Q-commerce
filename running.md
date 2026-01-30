# Q-Commerce Application Guide

This guide provides simplified instructions for running the Q-Commerce backend and frontend applications.

## Prerequisites

- Node.js >= 20
- npm (for backend and root)
- yarn (for frontend)
- PostgreSQL database

## Quick Start

We have simplified the startup process. You can now run both the backend and frontend with a single command from the root directory.

1. **Install Dependencies** (First time only):
   ```bash
   npm run install:all
   ```

2. **Start Applications**:
   ```bash
   npm run dev
   ```
   This will start:
   - Backend on [http://localhost:9000](http://localhost:9000)
   - Frontend on [http://localhost:8000](http://localhost:8000)

## Configuration Status

- **Region**: South Africa (ZA)
- **Currency**: South African Rand (ZAR)

## Manual Setup (If needed)

If you prefer to run them separately:

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
yarn dev
```

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error, you can kill the processes running on ports 9000 and 8000:

```bash
# Find and kill process on port 9000 (Backend)
lsof -ti:9000 | xargs kill -9

# Find and kill process on port 8000 (Frontend)
lsof -ti:8000 | xargs kill -9
```

### Database Issues
If you need to reset the database, navigate to the `backend` directory and check the specific README there or use `npx medusa db:migrate` and `npm run seed`.
