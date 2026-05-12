# Rental Scout Full-Stack v1

Small Week 8 full-stack practice app.

## What it uses

- React frontend
- Express backend
- PostgreSQL database
- JWT auth
- Protected dashboard
- CRUD for logged-in user's listings

## Setup

1. Install packages:

```bash
npm install
```

2. Create a local PostgreSQL database named `rental_scout_v1`.

3. Copy `.env.example` to `.env` and change values if needed.

4. Create tables and seed listings:

```bash
npm run db:setup
```

5. Start the backend:

```bash
npm run server
```

6. In another terminal, start the frontend:

```bash
npm run dev
```

## Learning checkpoints

1. Confirm public listings load from PostgreSQL.
2. Sign up and log in.
3. Open the dashboard and create one listing.
4. Edit and delete only your own listing.
5. Test with two users to understand ownership checks.
