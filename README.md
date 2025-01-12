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

<pre>
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
</pre>

### Frontend

<pre>
frontend/
├── package.json         # Frontend dependencies and scripts
├── package-lock.json    # Dependency tree
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS setup
├── src/                 # Main frontend directory
│   ├── App.css          # Global styles
│   ├── App.jsx          # Main application component
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx   # Header component
│   │   ├── Footer.jsx   # Footer component
│   │   └── Toast.jsx    # Notification component
│   ├── context/         # Context API setup
│   │   ├── AuthContext.jsx  # Authentication context
│   │   └── EmployeeContext.jsx # Employee management context
│   ├── pages/           # Application pages
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   └── Login.jsx
│   ├── index.css        # Tailwind CSS styles
│   └── main.jsx         # React entry point
</pre>

## Installation and Setup

### Prerequisites

- Node.js <br>
- npm or yarn <br>
- MySQL or another compatible database <br>

### Backend Setup

1. Navigate to the backend directory:<br>

   ```bash
   cd employee-management-system/backend


   ```

### Install dependencies:

- bash<br>
- npm install<br>
- Configure the database connection in src/config/db-connection.js.<br>
- Run migrations and seeders to set up the database:<br>
  - bash<br>
  - npx sequelize db:migrate<br>
  - npx sequelize db:seed:all<br>
- Start the backend server:<br>
  - bash<br>
  - npm start<br>

### Frontend Setup

- Navigate to the frontend directory:<br>
  - bash<br>
  - cd employee-management-system/frontend<br>
- Install dependencies:<br>
  - bash<br>
  - npm install<br>
- Start the development server:<br>
  - bash<br>
  - npm run dev<br>

### Usage

- Start both the backend and frontend servers.<br>
- Access the application at http://localhost:3000 (default frontend port).<br>

## API Endpoints

### Employee Routes

- POST /api/employees - Add a new employee<br>
- GET /api/employees - Fetch all employees<br>
- PUT /api/employees/:id - Update employee data<br>
- DELETE /api/employees/:id - Delete an employee<br>

### Department Routes

- POST /api/departments - Add a new department<br>
- GET /api/departments - Fetch all departments<br>
- PUT /api/departments/:id - Update department data<br>
- DELETE /api/departments/:id - Delete a department<br>

### Designation Routes

- POST /api/designations - Add a new designation<br>
- GET /api/designations - Fetch all designations<br>
- PUT /api/designations/:id - Update designation data<br>
- DELETE /api/designations/:id - Delete a designation<br>

## Technologies Used

Frontend:<br>

- React<br>
- Tailwind CSS<br>
- Vite<br>
- React Hot Toast<br>
- Context API<br>

## Backend:<br>

- Express.js<br>
- Sequelize<br>
- MySQL<br>

## Other Tools:<br>

- Node.js<br>
- npm<br>
- Git<br>

## License

This project is open-source and available under the MIT License (LICENSE).
