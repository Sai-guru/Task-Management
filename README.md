# Mini Project Management Portal

## Project Overview

A Full Stack Task Management Application built using React, TypeScript, Node.js, Express, and PostgreSQL.

The application allows users to:

* View all tasks
* Create new tasks
* Update task status
* Delete tasks
* Search tasks
* Filter tasks by status
* Sort tasks by creation date
* View dashboard statistics
* Toggle between Dark and Light themes

This project was developed as part of the Full Stack Application Developer Hiring Assessment.

---

## Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* React Router DOM
* Axios
* React Hook Form
* Zod
* React Hot Toast
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL
* pg
* dotenv
* cors
* morgan
* express-validator

### Database

* PostgreSQL (Neon)

---

## Project Structure

project-root/

frontend/

src/

components/

pages/

services/

types/

utils/

backend/

src/

config/

controllers/

database/

middleware/

models/

routes/

services/

types/

utils/

README.md

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_neon_database_url

NODE_ENV=development
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Database Schema

### Tasks Table

| Field       | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| title       | VARCHAR(255)       |
| description | TEXT               |
| status      | VARCHAR(30)        |
| created_at  | TIMESTAMP          |
| updated_at  | TIMESTAMP          |

### Status Values

* Pending
* In Progress
* Completed

---

## API Documentation

### Get All Tasks

```http
GET /api/tasks
```

Query Parameters:

```http
?search=
?status=
?sort=ASC
?sort=DESC
```

Response:

```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": []
}
```

---

### Create Task

```http
POST /api/tasks
```

Request:

```json
{
  "title": "Build Login Page",
  "description": "Create a responsive login page with proper validation.",
  "status": "Pending"
}
```

---

### Update Task Status

```http
PUT /api/tasks/:id
```

Request:

```json
{
  "status": "Completed"
}
```

---

### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Features Implemented

### Backend

* REST API Development
* MVC Architecture
* PostgreSQL Integration
* Validation using express-validator
* Error Handling Middleware
* Search API
* Filter API
* Sort API

### Frontend

* Dashboard Page
* Add Task Page
* React Router Navigation
* React Hook Form Validation
* Zod Schema Validation
* Axios API Integration
* Task Search
* Status Filter
* Date Sorting
* Dashboard Statistics
* Dark Mode Toggle
* Responsive UI

---

## Assumptions

* A task title is mandatory.
* Description must contain at least 20 characters.
* Default task status is "Pending" when not provided.
* Task status can be:

  * Pending
  * In Progress
  * Completed
* Dashboard statistics are calculated on the frontend using fetched task data.
* PostgreSQL database is hosted on Neon.

---

## Sample Git Commit History

```bash
Initial project setup

Backend setup

Database connection and table creation

Implemented task APIs

Added validation and error handling

Frontend setup with Vite and React

Added React Dashboard

Implemented Add Task page

Integrated frontend with backend

Added search, filter, and sort

Implemented dashboard statistics

Added dark mode support

Updated README

Final cleanup
```

---

## Future Improvements

* JWT Authentication
* Pagination
* Task Editing Form
* Unit Testing
* Docker Deployment
* CI/CD Integration

---

### Dashboard

[Dashboard](./assets/Dashboard.png)

---

### Add Task

[Newtask](./assets/Addingtask.png)
[Newtask](./assets/createAtask.png)

---

### Dark Mode

[Theme](./assets/themes.png)

---

## Screenshots

[GetAllTasks](./assets/getAlltasks.png)
[FilterByName](./assets/nameFilter.png)
[FilterByStatus](./assets/FilterByStatus.png)
[DeleteFromSite](./assets/delAtaskfront.png)
[Database](./assets/database.png)
[DeleteATask](./assets/deletetask.png)

---

## Author

Sai Guru Prigeesh M - Full Stack Developer 
