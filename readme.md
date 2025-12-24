**Project Name :** Vehicle Rental System <br>

**Live URL :** https://assignment2-jade-iota-47.vercel.app/

# Admin Credentials

I have setup vercel perfectly.So you can check directly in postman.
Here is admin email and password

```
  {  "email": "jaman@gm.com",
    "password" : "123456789"
  }
```

# Features

- Full Vehicle CRUD: Create, retrieve, update, and delete entries in the vehicle inventory.

- End-to-End Bookings: Manages the entire rental lifecycle with date checks and automated cost calculation.

- JWT & Role Security: Secures the application using JSON Web Tokens and role-based permissions.

- Dual-Role User System: Separate profiles for customers and admins, with hashed password protection.

- Real-Time Status: Tracks and updates vehicle availability instantly.

- Duration-Based Costs: Dynamically computes rental prices according to the booking duration.

# Technology Stack

- Backend Runtime & Framework: Powered by Node.js with the Express.js 5.x framework for server-side logic and API routing, implemented in TypeScript 5.x. Data is persisted using PostgreSQL as the primary production database.

- Security Implementation: Implements JWT (JSON Web Tokens) to handle user sessions and authentication. User passwords are protected using the bcryptjs library for secure hashing.

- Development Utilities: Utilizes tsx for executing TypeScript code during development, dotenv for managing environment variables, and the pg client library for connecting to PostgreSQL.

- Hosting Platform: The application is deployed and hosted on the Vercel platform.

# Technology Stack Overview

This project is built with a modern tech stack:

- Backend: Node.js with Express.js 5.x (TypeScript)

- Database: PostgreSQL

- Security: JWT for authentication, bcryptjs for password hashing

- Hosting: Deployed on Vercel

# Prerequisites

Before starting, ensure the following are installed on the system:

- Node.js (v18 or later recommended)

- npm (usually comes with Node.js)

- PostgreSQL (installed and running locally or accessible via a cloud service)

# Setup Guide

### 1. Clone the Repository

```
git clone https://github.com/tarekbinjaman/Assignment-2-Next-Level.git
cd Assignment-2-Next-Level
```

### 2. Install Dependencies

Install all required Node.js packages.

```
npm install
```

### 3. Environment Configuration

Create .env file in root directory

```
JWT_SECRET=b8c52ad8b4f8303288a02a2bf856768eed0572346cdd8219014e8ab148f28d5c2f898686660930d0dbc9919ffac173e66c965a75ad223d97e03b57325665a971
PORT=5000
CONNECTION_STR=postgresql://neondb_owner:npg_0TfjRGJIvtl5@ep-shiny-dust-ahwy0y9g-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 4. Database Setup

- Ensure PostgreSQL is running
- Create a database (e.g., vehicle_rental_db)
- The application will automatically create tables on first run

### 5. Run your application

```
npm run dev
```

The server will start on http://localhost:5000

# Usage

## Development Mode

Run:

```
npm run dev
```

## Production Build

1.Compile TypeScript to JavaScript:

```
npm run build
```

2.Run the compiled application::

```
node dist/server.js
```

# API Endpoints

## 🔐 Authentication

Base URL: /api/v1/auth

| Method | Endpoint              | Description                                  | Required Data                                | Access |
| ------ | --------------------- | -------------------------------------------- | -------------------------------------------- | ------ |
| POST   | `/api/v1/auth/signup` | Registers a new user (Customer or Admin)     | `name`, `role`, `email`, `password`, `phone` | Public |
| POST   | `/api/v1/auth/signin` | Authenticates a user and returns a JWT token | `email`, `password`                          | Public |

- POST /signup - Register a new user

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "1234567890",
  "role" : "customer"
}
```

- POST /signin - User login

```
{
  "email": "dash@example.com",
  "password": "SecurePass123"
}
```

## 👤 User Management API Endpoints

Routes for managing user accounts, typically accessible only to administrators.

| Method | Endpoint            | Description                                       | Access          |
| ------ | ------------------- | ------------------------------------------------- | --------------- |
| GET    | `/api/v1/users`     | Retrieves a list of all users                     | Admin only      |
| GET    | `/api/v1/users/:id` | Gets details of a specific user                   | Admin only      |
| PUT    | `/api/v1/users/:id` | Updates a user's information (e.g., role, status) | Admin, customer |
| DELETE | `/api/v1/users/:id` | Deletes a user account                            | Admin only      |

## 🚗 Vehicle Management API Endpoints

| Method | Endpoint               | Description                                                                           | Required Data (POST/PUT)                                                                 | Access            |
| ------ | ---------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------- |
| GET    | `/api/v1/vehicles`     | Gets a list of all available vehicles. Supports query params like `?status=available` | —                                                                                        | Public / Customer |
| GET    | `/api/v1/vehicles/:id` | Gets detailed information about a specific vehicle                                    | —                                                                                        | Public / Customer |
| POST   | `/api/v1/vehicles`     | Adds a new vehicle to the inventory                                                   | `vehicle_name`, `type`, `registration_number`, `daily_rent_price`, `availability_status` | Admin only        |
| PUT    | `/api/v1/vehicles/:id` | Updates a vehicle's details                                                           | Fields to update (e.g., `rentalPrice`, `status`)                                         | Admin only        |
| DELETE | `/api/v1/vehicles/:id` | Removes a vehicle from the inventory                                                  | —                                                                                        | Admin only        |


## 📦 Booking (Rental Lifecycle) API Endpoints

Routes that handle the rental lifecycle: creating, viewing, and managing bookings.

| Method | Endpoint                    | Description                                                     | Required Data (POST)                 | Access                         |
|--------|-----------------------------|-----------------------------------------------------------------|-------------------------------------|--------------------------------|
| GET    | `/api/v1/bookings`             | Gets bookings. Admins see all; customers see only their own     | —                                   | Customer, Admin                |
| GET    | `/api/v1/bookings/:bookingID`         | Gets details of a specific booking                              | —                                   | Customer (own only), Admin     |
| POST   | `/api/v1/bookings`             | Creates a new booking                                          | `vehicleId`, `startDate`, `endDate` | Customer                       |
| PUT    | `/api/v1/bookings/:bookingID/status`  | Updates a booking's status (e.g., confirmed, cancelled)        | `status`                            | Admin only                     |
| DELETE | `/api/v1/bookings/:bookingID`         | Cancels a booking   