# Rental Property Management System

A full-stack web application for managing rental property bookings, built with Spring Boot and React. The platform supports two user roles — **Owner** and **Tenant** — enabling property owners to list and manage their rental properties, while tenants can browse properties, submit booking requests, and track their status through an approval workflow.

## Tech Stack

- **Backend:** Spring Boot 4.0, Spring Security, Spring Data JPA
- **Database:** PostgreSQL
- **Frontend:** React 19, Vite
- **Build Tools:** Maven, npm

## Key Features

- **Role-based Authentication** — Separate flows for Owner and Tenant users with session-based login
- **Property CRUD** — Owners can create, update, delete, and view their own properties
- **Booking Requests with Status Workflow** — Tenants request bookings; Owners approve or decline; statuses include *Pending, Approved, Declined,* and *Cancelled*
- **Audit Logging** — All booking status changes are logged with timestamps for accountability
- **Dashboard** — Role-specific dashboard views for managing properties and bookings
- **Search & Filter** — Filter properties by location, price range, and availability

## Setup Instructions

### Backend

1. **Clone the repository** and navigate to the `backend` directory.
2. **Configure the database** — Copy `src/main/resources/application.properties.example` to `src/main/resources/application.properties` and fill in your PostgreSQL credentials and CORS origins:
   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```
   Then edit `application.properties` and set the environment variables (or replace `${...}` placeholders with actual values):
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   app.cors.allowed-origins=http://localhost:5173
   ```
3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```
   The server starts on `http://localhost:8080`.

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app is served at `http://localhost:5173`.

> **Note:** Ensure the backend is running before using the frontend, as the React app fetches data from the backend API.

## Screenshots

*(Screenshots to be added)*