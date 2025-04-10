# Task Management API

A backend-heavy Task Management API built with Node.js, Express, and MongoDB, utilizing cookie-based authentication. This project is designed as an internship assignment to showcase backend development skills, including API design, authentication, and data modeling.

## Features

- **User Authentication**: Register and log in with JWT stored in HttpOnly cookies.
- **Task Management**: Create, read, update, and delete tasks with user-specific access.
- **Advanced Features**: Task filtering (status, priority, due date), pagination, overdue detection, and analytics.
- **Security**: Password hashing with bcrypt, rate limiting, and cookie-based auth.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with HttpOnly cookies
- **Validation**: Joi
- **Security**: bcrypt, express-rate-limit
- **Dependencies**: See `package.json`

## Prerequisites

- Node.js: v16+ (tested with v22.13.1)
- MongoDB: Local instance or MongoDB Atlas account
- Git: For version control
- Postman: For API testing (optional)

## Setup Instructions (Local Machine)

### Clone the Repository:
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd task-management-app
```
## Install Dependencies:
```bash
npm install
```
## Set Up Environment Variables:
- Create a .env file in the root directory:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your-secret-key
```

## Run MongoDB:
- Local: Start MongoDB with mongod (ensure it’s installed).
- Atlas: Create a free cluster at mongodb.com, get the connection string, and update MONGO_URI.

## Start The Server:
```bash
npm start
```
# API Endpoints

## Authentication

- `POST https://phantom-click-production.up.railway.app/api/auth/register` - Register a user (sets token cookie)  
- `POST https://phantom-click-production.up.railway.app/api/auth/login` - Log in (sets token cookie)  
- `POST https://phantom-click-production.up.railway.app/api/auth/logout` - Log out (clears token cookie)

## Tasks (authenticated with token cookie)

- `POST https://phantom-click-production.up.railway.app/api/tasks` - Create a task  
- `GET https://phantom-click-production.up.railway.app/api/tasks` - Get tasks (supports `?status=`, `?priority=`, `?dueDate=`, `?page=`, `?limit=`)  
- `PUT https://phantom-click-production.up.railway.app/api/tasks/:taskId` - Update a task  
- `DELETE https://phantom-click-production.up.railway.app/api/tasks/:taskId` - Delete a task  
- `GET https://phantom-click-production.up.railway.app/api/tasks/analytics` - Get task analytics
