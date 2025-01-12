# Employee Management System

## Overview

The Employee Management System is a full-stack web application designed for managing employees, departments, and designations. It features a modern React-based frontend styled with Tailwind CSS and an Express.js backend utilizing Sequelize for database management. This application provides a seamless experience for employee management with intuitive features and robust backend APIs.

## Features

### Frontend:

- User-friendly interface built with React and Tailwind CSS.
- Responsive design for optimal usability across devices.
- Features include viewing, creating, editing, and deleting employee records.
- State management using React Context API.
- Notifications and alerts powered by React Hot Toast.

### Backend:

- RESTful APIs for managing employees, departments, and designations.
- Authentication and authorization middleware.
- Database operations powered by Sequelize ORM.
- Includes migrations and seeders for initial data setup.
- Secure and scalable architecture.

## Project Structure

### Backend

backend/
├── package.json # Backend dependencies and scripts
├── package-lock.json # Dependency tree
├── src/ # Main backend directory
│ ├── app.js # Entry point for the Express server
│ ├── config/ # Configuration files
│ │ ├── config.js # App configuration
│ │ └── db-connection.js # Database connection setup
│ ├── controllers/ # Business logic
│ │ ├── auth-controller.js
│ │ ├── department-controller.js
│ │ ├── designation-controller.js
│ │ └── employee-controller.js
│ ├── middlewares/ # Middleware for authentication
│ │ └── check-auth.js
│ ├── migrations/ # Database migration files
│ │ └── 20250103203503-add-employee-id-column.js
│ ├── models/ # Sequelize models
│ │ ├── department.js
│ │ ├── designation.js
│ │ ├── employee.js
│ │ └── user.js
│ ├── routes/ # API route handlers
│ │ ├── auth-routes.js
│ │ ├── department-routes.js
│ │ ├── designation-routes.js
│ │ └── employee-routes.js
│ ├── seeders/ # Initial data for the database
│ │ └── seedData.js

### Frontend

frontend/
├── package.json # Frontend dependencies and scripts
├── package-lock.json # Dependency tree
├── vite.config.js # Vite configuration
├── tailwind.config.js # Tailwind CSS setup
├── src/ # Main frontend directory
│ ├── App.css # Global styles
│ ├── App.jsx # Main application component
│ ├── components/ # Reusable UI components
│ │ ├── Header.jsx # Header component
│ │ ├── Footer.jsx # Footer component
│ │ └── Toast.jsx # Notification component
│ ├── context/ # Context API setup
│ │ ├── AuthContext.jsx # Authentication context
│ │ └── EmployeeContext.jsx # Employee management context
│ ├── pages/ # Application pages
│ │ ├── Dashboard.jsx
│ │ ├── Employees.jsx
│ │ └── Login.jsx
│ ├── index.css # Tailwind CSS styles
│ └── main.jsx # React entry point

## Installation and Setup

### Prerequisites

- Node.js
- npm or yarn
- MySQL or another compatible database

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd employee-management-system/backend


   ```

### Install dependencies:

bash
npm install
Configure the database connection in src/config/db-connection.js.
Run migrations and seeders to set up the database:
bash
npx sequelize db:migrate
npx sequelize db:seed:all
Start the backend server:
bash
npm start

### Frontend Setup

Navigate to the frontend directory:
bash
cd employee-management-system/frontend
Install dependencies:
bash
npm install
Start the development server:
bash
npm run dev

### Usage

Start both the backend and frontend servers.
Access the application at http://localhost:3000 (default frontend port).

## API Endpoints

### Employee Routes
POST /api/employees - Add a new employee
GET /api/employees - Fetch all employees
PUT /api/employees/:id - Update employee data
DELETE /api/employees/:id - Delete an employee

### Department Routes

POST /api/departments - Add a new department
GET /api/departments - Fetch all departments
PUT /api/departments/:id - Update department data
DELETE /api/departments/:id - Delete a department

### Designation Routes

POST /api/designations - Add a new designation
GET /api/designations - Fetch all designations
PUT /api/designations/:id - Update designation data
DELETE /api/designations/:id - Delete a designation

## Technologies Used

Frontend:
React
Tailwind CSS
Vite
React Hot Toast
Context API

## Backend:

Express.js
Sequelize
MySQL

## Other Tools:

Node.js
npm
Git

## License

This project is open-source and available under the MIT License (LICENSE).
