# Rental Property Management System

A fully responsive frontend-only rental property management system built with React and Vite.

## Features

- Home page with hero section and featured properties
- Properties listing with dynamic filtering (location and price)
- Property detail pages
- Login and Register pages with form validation
- Dashboard with role-based UI (Owner/Tenant)
- Fully responsive design
- Modern UI with smooth animations

## Installation

1. Install dependencies:
```bash
npm install react-router-dom
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local server URL (usually http://localhost:5173)

## Project Structure

```
src/
├── App.jsx              - Main app with routing
├── properties.js        - Dummy property data
├── Navbar.jsx          - Navigation component
├── Footer.jsx          - Footer component
├── PropertyCard.jsx    - Property card component
├── FilterBar.jsx       - Filter component
├── Home.jsx            - Home page
├── Properties.jsx      - Properties listing page
├── PropertyDetail.jsx  - Property detail page
├── Login.jsx           - Login page
├── Register.jsx        - Register page
├── Dashboard.jsx       - Dashboard page
└── [CSS files]         - Styling for each component
```

## Routes

- `/` - Home page
- `/properties` - Properties listing
- `/property/:id` - Property details
- `/login` - Login page
- `/register` - Register page
- `/dashboard` - Dashboard (role-based)

## Technologies

- React 19
- Vite
- React Router DOM
- Plain CSS
- No backend integration
