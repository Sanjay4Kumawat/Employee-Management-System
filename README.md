# Employee Management System

A web-based application to efficiently manage employee records, including adding employees, assigning departments, and generating reports.

## Features
- **Add Employees**: Register new employees with details like name, phone, address, salary, etc.
- **Department Assignment**: Assign employees to departments (HR, IT, Finance, Operations).
- **Search & View Employees**: Search employees by name or ID and view their details.
- **Update Details**: Modify employee information (e.g., address, phone, department).
- **Reports**:
  - Department-wise salary statistics.
  - Gender ratio in each department.

## Tech Stack
- **Frontend**: React.js, Vite, CSS
- **Backend**: Node.js, Express.js
- **Database**: SQL (Neon Console)

## Prerequisites
- **Node.js**: [Download and install](https://nodejs.org/)
- **npm**: Comes with Node.js
- **Neon Console PostgreSQL**: Set up a cloud-hosted SQL database.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system


**Install Dependencies**

**For the frontend:**
cd employee-management-fe
npm install

**For the backend:**
cd ../employee-management-be
npm install

Database Setup:

**Create a PostgreSQL database on Neon Console.**
**Create the required tables**
CREATE TABLE Departments (
  department_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE Employees (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(15),
  dob DATE,
  address TEXT,
  gender VARCHAR(10),
  salary NUMERIC(10, 2),
  department_id INT REFERENCES Departments(department_id)
);

**Preload the Departments table with:**
INSERT INTO Departments (name) VALUES ('HR'), ('Finance'), ('IT'), ('Operations');

**Set Up Environment Variables:**
Create a .env file in the employee-management-be directory:

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port


**Running the Project**
go to the sanju project folder the open folder according to given steps

**Start the Backend:**
cd employee-management-be
npm start


**Start the Frontend:**
cd ../employee-management-fe
npm run dev

**Open your browser and go to:**
Frontend: http://localhost:5173
Backend API: http://localhost:5000

