# Q-Commerce Application Guide

This guide provides instructions for running the Q-Commerce backend and frontend applications.

## Prerequisites

- Node.js >= 20
- npm (for backend)
- yarn (for frontend)
- PostgreSQL database

## Environment Setup

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment template:
   ```bash
   cp .env.template .env
   ```

3. Update the `.env` file with your configuration (database credentials, etc.)

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the environment template:
   ```bash
   cp .env.template .env.local
   ```

3. Update the `.env.local` file with your configuration (Medusa backend URL, Publishable API Key, etc.)

## Running the Applications

### Quick Start (Both Applications)

From the root directory, you can run both applications in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn dev
```

### Backend Only

The backend runs on the default Medusa port (typically 9000).

```bash
cd backend

# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start

# Seed the database with sample data
npm run seed
```

### Frontend Only

The frontend runs on port 8000.

```bash
cd frontend

# Development mode (with Turbopack)
yarn dev

# Production mode
yarn build
yarn start
```

## Port Mappings

| Service  | Port | URL                    |
|----------|------|------------------------|
| Backend  | 9000 | http://localhost:9000  |
| Frontend | 8000 | http://localhost:8000  |

## Useful Commands

### Backend
- `npm run build` - Build the backend
- `npm run seed` - Seed the database with sample data
- `npm run test:unit` - Run unit tests
- `npm run test:integration:http` - Run HTTP integration tests

### Frontend
- `yarn lint` - Lint the code
- `yarn build` - Build for production
- `yarn analyze` - Analyze the bundle size

## Creating Admin Credentials

To create an admin user for the Medusa backend:

```bash
cd backend
npx medusa user --email admin@example.com --password supersecret
```

## Database Reset

If you need to reset the database:

```bash
cd backend

# Drop and recreate the database (using psql)
psql -U postgres -c "DROP DATABASE medusa_db;"
psql -U postgres -c "CREATE DATABASE medusa_db;"

# Run migrations
npx medusa db:migrate

# Seed with default data
npm run seed
```

## Troubleshooting

### Publishable Key Error
If you encounter a "Missing publishable key" error in the frontend:
1. Access the Medusa admin at `http://localhost:9000/app`
2. Navigate to Settings → Publishable API Keys
3. Copy the key and add it to your frontend `.env.local` file as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

### URL/Path Issues
If you encounter "Could not read from file" or 404 errors for admin assets:
- Ensure your project path does **not** contain special characters like `#`.
- Example: `/User/#Project` will break Vite/Esbuild. Rename it to `/User/_Project`.

### Port Already in Use
If you get a "port already in use" error:
- Backend: Check for processes using port 9000 and kill them
- Frontend: Check for processes using port 8000 and kill them

```bash
# Find process using a specific port (e.g., 9000)
lsof -ti:9000

# Kill the process
kill -9 $(lsof -ti:9000)
```

## Notes

- The frontend uses **yarn** as its package manager
- The backend uses **npm** as its package manager
- Make sure PostgreSQL is running before starting the backend
- The frontend requires the backend to be running to function properly
