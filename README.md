# HRMS Lite - Human Resource Management System

A full-stack web application for managing employees and tracking attendance, built with FastAPI (Python) and React.

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)
7. [Setup Instructions](#setup-instructions)
8. [Features](#features)
9. [Assumptions](#assumptions)
10. [Deployment Guide](#deployment-guide)

---

## Overview

HRMS Lite is a lightweight employee management system that allows administrators to:
- Add, view, and delete employee records
- Mark daily attendance (Present/Absent)
- View attendance history for each employee
- Monitor workforce statistics via dashboard

---

### Collections Schema

#### employees Collection
```json
{
  "_id": "ObjectId",
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### attendance Collection
```json
{
  "_id": "ObjectId",
  "employee_id": "EMP001",
  "date": "2024-01-15",
  "status": "Present",
  "created_at": "2024-01-15T09:00:00Z"
}
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 | UI Components |
| Frontend | Vite | Build Tool & Dev Server |
| Frontend | React Router v6 | Client-side Routing |
| Frontend | Axios | HTTP Client |
| Frontend | Tailwind CSS | Styling |
| Frontend | React Icons | Icon Library |
| Backend | Python 3.8+ | Programming Language |
| Backend | FastAPI | Web Framework |
| Backend | Pydantic | Data Validation |
| Backend | Uvicorn | ASGI Server |
| Database | MongoDB | NoSQL Database |
| Database | PyMongo | MongoDB Driver |
| Deployment | Vercel | Frontend Hosting |
| Deployment | Render | Backend Hosting |
| Deployment | MongoDB Atlas | Cloud Database |

---

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Employees

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/employees` | Get all employees | - | `[{employee}]` |
| GET | `/employees/{id}` | Get employee by ID | - | `{employee}` |
| POST | `/employees` | Create employee | `{employee_id, full_name, email, department}` | `{employee}` |
| DELETE | `/employees/{id}` | Delete employee | - | `{message}` |

#### Attendance

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/attendance` | Get all records | - | `[{attendance}]` |
| GET | `/attendance/{id}` | Get by employee | - | `[{attendance}]` |
| POST | `/attendance` | Mark attendance | `{employee_id, date, status}` | `{attendance}` |

#### Dashboard

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/dashboard` | Get statistics | `{total_employees, present_today, absent_today}` |

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with MongoDB URL
echo "MONGO_URL=your_mongodb_connection_string" > .env

# Run server
uvicorn main:app --reload
```

Server runs at: `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run dev server
npm run dev
```

App runs at: `http://localhost:5173`

---

## Features

### Dashboard
- Total employee count
- Present employees today
- Absent employees today
- Recent employees table

### Employee Management
- Add new employees with validation
- View all employees in table format
- Delete employees (cascades to attendance)
- Unique employee ID and email validation

### Attendance Tracking
- Mark Present/Absent for any date
- View attendance history per employee
- Update attendance if re-marked for same date
- Present days counter per employee

---
