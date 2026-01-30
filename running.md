# Q-Commerce Application Guide

This guide provides simplified instructions for running the Q-Commerce backend and frontend applications.

## Prerequisites

- Node.js >= 20
- npm (for backend and root)
- yarn (for frontend)
- PostgreSQL database

## Quick Start

We have simplified the startup process. You can now run both the backend and frontend with a single command from the root directory.

> **Important**: Ensure your `frontend/.env.local` is configured for local development:
> - `MEDUSA_BACKEND_URL=http://localhost:9000`
> - `NEXT_PUBLIC_BASE_URL=http://localhost:8000`

1. **Check Ports** (Optional):
   If you have run the app before, ensure ports 8000 and 9000 are free.
   ```bash
   npm run kill-ports
   ```

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

## Recent Fixes

### Pagination Issue (2026-01-30)
- **Fixed**: Product pagination was showing 34 pages instead of the correct 9 pages
- **Root Cause**: The `listProductsWithSort` function was only fetching 100 products while calculating total pages based on the full product count
- **Solution**: Updated to fetch all products by:
  1. First fetching with limit of 1 to get total count
  2. Then fetching all products using the actual count
  3. This ensures all products are available for client-side sorting and pagination

### Currency Display Fix
- Fixed price display from cents to actual currency (e.g., R280.00 instead of R28,000.00)
- Updated `convertToLocale` function to divide by 100

### Product Thumbnails
- Updated product aspect ratio from 9:16 to 1:1 for better display

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
