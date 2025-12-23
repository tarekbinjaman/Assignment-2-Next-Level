**Project Name :** Vehicle Rental System <br>

**Live URL :** https://assignment2-jade-iota-47.vercel.app/

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
