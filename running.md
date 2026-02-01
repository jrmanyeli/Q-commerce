# Q-Commerce Application Guide

This guide provides simplified instructions for running the Q-Commerce backend and frontend applications.

## Quick Start

Everything is now pre-configured. To start both the backend and frontend, run this single command from the root directory:

```bash
npm run dev
```

This will start:
- **Backend**: [http://localhost:9000](http://localhost:9000)
- **Frontend**: [http://localhost:8000/za](http://localhost:8000/za)

---

## Simplified Startup (One-Time Setup)

If you are running the application for the first time or after a clean clone:

1. **Install All Dependencies**:
   ```bash
   npm run install:all
   ```

2. **Check Ports** (If ports 8000 or 9000 are blocked):
   ```bash
   npm run kill-ports
   ```

3. **Start Apps**:
   ```bash
   npm run dev
   ```

## Recent Fixes & Updates

### Product Visibility & Navigation (2026-02-01)
- **Fixed**: Products were missing from the home/store pages (only 2 were showing).
- **Fixed**: Navigation links in the 'Filter' menu were missing the mandatory `/za/` prefix.
- **Solution**: 
  - Updated frontend cache strategy to `no-store` in `lib/data/products.ts` to ensure fresh data.
  - Dynamically prepended the country code to all category and collection links.
  - Verified infinite scroll correctly loads the full product catalog.

### Pagination & Sorting (2026-01-30)
- **Fixed**: Pagination mismatch where 34 pages were shown for only 425 products.
- **Solution**: Updated fetching logic to load all products for accurate client-side sorting and paging.

### Currency & Display
- **Currency**: Fixed price display to show actual currency (e.g., R280.00) instead of cents.
- **Thumbnails**: Updated product image aspect ratio to 1:1 for a cleaner look.

## Manual Setup (Development Only)

If you need to run services independently:

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

### Kill Processes
If you get "port already in use", run:
```bash
npm run kill-ports
```

### Database
The application uses the `q_commerce_db` PostgreSQL database. Ensure your local PostgreSQL service is running.

