Client Management System
Overview
The Client Management System is a web application designed to efficiently manage client data, projects, tasks, meetings, and portfolios. Built using a full-stack JavaScript approach, this application leverages Angular for the frontend and Node.js with Express for the backend, using MySQL as the database. The project is structured around Agile methodologies and consists of iterative sprints for development and testing.

Prerequisites
Install Node.js
Install Angular CLI by running:
npm install -g @angular/cli
Install MySQL

Clone the Repository:
git clone https://github.com/yourusername/client-management-system.git
cd client-management-system

Usage:
Frontend: Navigate to the frontend directory and install dependencies:

cd client-management-system/client-src
npm install
Backend: Navigate to the backend directory and install dependencies:


cd ../server-src
npm install
Database Setup: Create a MySQL database and update the credentials in server/config/db.config.js.

How to Run the Project
Front-End (Client Side)
Navigate to the frontend directory:

cd client-management-system/client-src

Run the application:
ng serve -o

Back-End (Server Side)
Navigate to the backend directory:
cd client-management-system/server-src

Run the server:
node server.js

Access the Application
Open your web browser and navigate to http://localhost:4200. You can register or log in to access the client management portal.

Testing
Testing is implemented using JUnit and Cucumber:

Unit Tests: Individual components are tested using JUnit.
BDD Tests: Cucumber is used for behavior-driven development, ensuring that the application meets user requirements.
To run the tests, use the following commands in Eclipse or your preferred IDE.
