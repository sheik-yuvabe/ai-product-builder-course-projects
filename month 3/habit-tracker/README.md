# Habit Tracker

A full-stack habit tracker for students and working professionals who want to
build consistent daily routines.

## Features

- Signup and login with hashed passwords
- JWT-protected habit and completion routes
- User-specific habits
- Add, edit, and delete habits
- Mark today's habits as complete
- View completion history
- Search habits by name
- Filter habits by all, active, or completed
- Responsive React UI with loading, empty, and error states

## Tech Stack

- React
- Vite
- React Router
- Express.js
- PostgreSQL
- bcryptjs
- JSON Web Tokens
- Simple CSS

## MVP Workflow

1. A user signs up or logs in.
2. The dashboard loads only that user's habits.
3. The user creates, edits, or deletes habits.
4. The user marks a habit complete for today's date.
5. The user views completion history.

## Database Schema

### `users`

| Column | Purpose |
| --- | --- |
| `id` | Primary key |
| `name` | User's display name |
| `email` | Unique login email |
| `password_hash` | Hashed password |
| `created_at` | Account creation time |

### `habits`

| Column | Purpose |
| --- | --- |
| `id` | Primary key |
| `user_id` | Habit owner |
| `name` | Habit name |
| `created_at` | Habit creation time |

### `habit_completions`

| Column | Purpose |
| --- | --- |
| `id` | Primary key |
| `habit_id` | Completed habit |
| `completed_date` | Date completed |

Each user can own many habits. Each habit can have many completion records.

## API Routes

### Auth

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | Create account |
| `POST` | `/api/auth/login` | Log in |

### Habits

These routes require `Authorization: Bearer <token>`.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/habits` | List logged-in user's habits |
| `POST` | `/api/habits` | Create habit |
| `PUT` | `/api/habits/:id` | Rename habit |
| `DELETE` | `/api/habits/:id` | Delete habit |

### Completions

These routes require `Authorization: Bearer <token>`.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/completions` | List completion history |
| `POST` | `/api/completions/habits/:id/today` | Mark habit complete today |
| `DELETE` | `/api/completions/habits/:id/today` | Remove today's completion |

### Health Checks

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check API server |
| `GET` | `/api/db-health` | Check PostgreSQL connection |

## Local Setup

Install dependencies:

```powershell
npm install
```

Create a local `.env` file using `.env.example` as the guide:

```text
PORT=5000
DATABASE_URL=postgres://postgres:your_password@localhost:5432/habit_tracker
JWT_SECRET=replace_this_with_a_long_random_secret
VITE_API_URL=http://localhost:5000/api
```

Start PostgreSQL, then create the database:

```powershell
npm run db:create
```

Create the tables:

```powershell
npm run db:setup
```

Start the backend:

```powershell
npm run server
```

Start the frontend in another terminal:

```powershell
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Vite frontend |
| `npm run server` | Start Express backend |
| `npm run db:create` | Create PostgreSQL database |
| `npm run db:setup` | Create database tables |
| `npm run lint` | Run ESLint |
| `npm run build` | Build frontend |
| `npm run preview` | Preview production frontend build |

## Deployment Prep

Required environment variables:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `VITE_API_URL`

Before deployment:

1. Use a hosted PostgreSQL database.
2. Set `DATABASE_URL` and `JWT_SECRET` in the backend host.
3. Run the table setup command against the hosted database.
4. Set `VITE_API_URL` to the deployed backend API URL.
5. Build the frontend with `npm run build`.

## Known Limitations

- Deployment configuration is not added yet.
- There is no password reset flow.
- There is no advanced streak chart yet.
