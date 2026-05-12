# Project Log

## Project

Rental Scout Full-Stack v1

## Goal

Build a small full-stack app with database listings, authentication, protected pages, and CRUD.

## Implementation Log

### Checkpoint 1: Project setup

- Created a React app using Vite.
- Added planned backend dependencies in `package.json`.
- Added scripts for frontend, backend, and database setup.

### Checkpoint 2: Database plan

- Added `users` table for signup and login.
- Added `listings` table for rental listings.
- Added seed listings so the browse page can show database data.

### Checkpoint 3: Backend API

- Added Express server in `server/index.js`.
- Added auth routes for signup, login, and current user.
- Added listing routes for public read and protected CRUD.
- Added ownership checks so users can edit and delete only their own listings.

### Checkpoint 4: Frontend screens

- Replaced the Vite starter screen with Rental Scout UI.
- Added browse, auth, and protected dashboard views.
- Added frontend API calls for auth and listing CRUD.

### Checkpoint 5: Verification

- Installed npm packages successfully.
- Ran `npm run lint` successfully.
- Ran `npm run build` successfully.
- Started the backend and confirmed `GET /api/health` returns `ok`.
- Started the frontend and confirmed `http://127.0.0.1:5173/` responds.
- Tried `npm run db:setup`, but `psql` did not finish before the timeout. This usually means PostgreSQL is waiting for setup details like database creation, password, or connection config.

## Current Status

Code for the first full-stack version is in place. Frontend build and lint pass. Backend starts. Database setup works. Student confirmed auth and CRUD flow works.

## Next Student Checkpoint

Create the PostgreSQL database named `rental_scout_v1`, make sure `.env` has the correct database password, then run `npm run db:setup` again.

### Checkpoint 6: Database setup command fix

- Changed `npm run db:setup` to use `node server/setup-db.js`.
- This reads `DATABASE_URL` from `.env`, so PostgreSQL uses the app database user instead of the Windows username.
- Updated the setup script to create `rental_scout_v1` if it does not exist.
- Ran `npm run db:setup` successfully.

### Checkpoint 7: Student CRUD test

- Student confirmed signup/login worked.
- Student confirmed protected dashboard CRUD worked.
- Student created, edited, and deleted a rental listing.

### Checkpoint 8: Listing detail view

- Added selected listing state in `src/App.jsx`.
- Added `View details` action on public listing cards.
- Added a detail view with back navigation, city, title, rent, description, and owner name.

### Checkpoint 9: API-backed detail route

- Added `GET /api/listings/:id` on the backend.
- Updated the frontend details button to fetch the latest listing data by ID.
- Added a loading state while the detail request is running.

### Checkpoint 10: Browse filters

- Added search by title, city, and description.
- Added city filter based on loaded database listings.
- Added max rent filter for quick listing comparison.

### Checkpoint 11: Dashboard summary

- Added protected dashboard stats for owned listing count and average rent.
- Improved empty state text for no matching listings.

### Checkpoint 12: Demo readiness

- Added a Demo page with the review flow for public data, filters, detail view, auth, CRUD, and ownership testing.
