# Task Manager App

A full-stack task management system with JWT authentication and role-based access.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt
- **Frontend**: React (Vite), Axios, React Router, Vanilla CSS

## Setup Instructions

### Unified (Recommended)
1. Run `npm run install-all` from the root.
2. Run `npm run build` to build the frontend.
3. Run `NODE_ENV=production npm start` to run both on port 5000.

### Docker (Bonus)
1. Ensure Docker is running.
2. Run `docker-compose up --build`.
3. Application will be available at `http://localhost:5000`.

### Backend (Dev)
1. `cd backend`
2. `npm install`
3. Create `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT`
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## API Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/tasks` - Get all tasks (Protected)
- `POST /api/v1/tasks` - Create task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)

## Database Schema
### User
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed)
- `role` (user/admin)

### Task
- `title` (String)
- `description` (String)
- `status` (todo/in-progress/done)
- `priority` (low/medium/high)
- `user` (Reference to User)

## Scalability Notes
- **Horizontal Scaling**: Use stateless JWT and sticky sessions or a shared session store (Redis) if needed.
- **Microservices**: Can split Auth and Task logic into separate services communicating via REST or Message Queues.
- **Caching**: Implement Redis for frequently accessed task lists to reduce DB load.
- **Indexing**: Add indexes on `user` field in Task model and `email` in User model for faster queries.
