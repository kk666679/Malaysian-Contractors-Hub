# MC-Hub: Malaysian Contractors Hub

MC-Hub is a web-based platform designed for contractors in Malaysia, providing tools to manage contracting projects in various sectors like civil engineering, electrical systems, building automation, and HVAC. The platform enables contractors to interact, generate bids, manage compliance, and track project progress using modern technologies such as **React**, **Vercel**, **Neon** for PostgreSQL, and **TailwindCSS**.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup (Neon)](#database-setup-neon)
- [Deployment](#deployment)
- [External API Integrations](#external-api-integrations)
- [Authentication & Authorization](#authentication-authorization)
- [Testing](#testing)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

MC-Hub aims to streamline project management and contractor-client interactions across multiple disciplines, including civil engineering, electrical systems, sewerage & drainage, ELV systems, and HVAC systems. The platform allows users to:

- Generate custom bids based on real-time data.
- Monitor compliance with safety regulations and local building codes.
- Access tools for project design, simulation, and management.
- Track project timelines, budgets, and resources.

## Tech Stack

- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: Next-generation front-end build tool, optimizing React applications for speed and performance.
  - **TailwindCSS**: A utility-first CSS framework for designing custom UIs without leaving the HTML.
  - **PWA** (Progressive Web App): Enable offline capabilities and fast load times with service workers.
  
- **Backend**: 
  - **Node.js**: JavaScript runtime for building scalable back-end services.
  - **Express** or **NestJS**: Web application frameworks for building API endpoints and managing server-side logic.
  - **Neon** (PostgreSQL): A serverless, real-time PostgreSQL database with auto-scaling and high availability.
  - **Redis**: For caching and session management to improve response times.

- **Authentication & Authorization**:
  - **JWT**: JSON Web Tokens for secure user authentication.
  - **OAuth2**: Social login integrations (e.g., Google, Facebook).
  - **RBAC**: Role-Based Access Control for managing user roles and permissions.

- **DevOps & CI/CD**:
  - **Vercel**: Platform for deploying the React frontend with automated CI/CD pipelines.
  - **Docker**: For containerizing applications to ensure consistent environments across different machines.
  - **Kubernetes**: For orchestrating microservices, if needed for scaling.

- **Testing**:
  - **Jest**: JavaScript testing framework for unit and integration tests.
  - **React Testing Library**: For testing React components.
  - **Supertest**: For testing API endpoints.
  - **Cypress/Playwright**: For end-to-end testing.

## Project Structure

### 1. Frontend Structure

The frontend codebase is organized as follows:

```bash
src/
│
├── assets/           # Static resources like images, icons, fonts
├── components/       # Reusable UI components (buttons, cards, inputs)
│   ├── ui/
│   ├── layout/
│   └── features/
├── forms/            # Form management (React Hook Form with Zod validation)
├── pages/            # Views (Dashboard, Marketplace, etc.)
├── hooks/            # Custom hooks for API calls, state management
├── styles/           # TailwindCSS setup and custom styles
├── types/            # TypeScript interfaces
└── utils/            # Helper functions like date formatting, API utils
```

### 2. Backend Structure

The backend structure (Node.js/Express) is as follows:

```bash
src/
│
├── config/           # Environment settings, DB configurations
├── controllers/      # API controllers (BidController, UserController)
├── models/           # Data models (ORM for PostgreSQL)
├── routes/           # API route definitions
├── services/         # Core business logic
├── middleware/       # Authentication, logging middleware
├── utils/            # Helper functions
└── tests/            # Unit and integration tests
```

### 3. Database Structure

* **Neon**: The PostgreSQL database provides a serverless, scalable solution for managing structured data such as contracts, bids, and invoices.
* **Redis**: Provides caching and session management to ensure fast access to frequently accessed data.

## Installation

### 1. Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mc-hub.git
   cd mc-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

### 2. Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (e.g., `DATABASE_URL`, `JWT_SECRET`, `PORT`).

4. Start the backend server:

   ```bash
   npm start
   ```

### 3. Database Setup (Neon)

1. Create a Neon account at [Neon](https://neon.tech/) and set up a PostgreSQL instance.
2. Get the connection string and update your `.env` file in the backend with `DATABASE_URL=<your-neon-db-connection-url>`.
3. Run database migrations:

   ```bash
   npm run migrate
   ```

## Deployment

### 1. Frontend Deployment (Vercel)

1. Push the frontend code to a GitHub repository.
2. Sign up for a Vercel account and link your GitHub repository.
3. Vercel will automatically deploy the frontend and provide a live URL.

### 2. Backend Deployment

1. Containerize the backend using Docker for consistent environments across all deployments.
2. Deploy using platforms like **Heroku**, **AWS**, or **DigitalOcean** based on your requirements.

## External API Integrations

The platform integrates with various third-party APIs for enhanced functionality:

* **Bid Generation API**: Custom bid generation based on Malaysian market data.
* **Weather API**: Integration for real-time weather data for scheduling.
* **Compliance Tracker API**: Fetches updates on building codes and regulations.
* **Firebase Cloud Messaging**: For real-time notifications about bid statuses, project updates, and compliance issues.

## Authentication & Authorization

MC-Hub uses **JWT** for secure user authentication, **OAuth2** for social login (e.g., Google and Facebook), and **RBAC** (Role-Based Access Control) to manage user roles:

* **Admin**: Full access to all features.
* **Contractor**: Access to bid generation, project management, etc.
* **Client**: Access to marketplace, bids, and project updates.

## Testing

The project is equipped with comprehensive testing strategies to ensure reliability:

* **Jest** for unit and integration tests.
* **React Testing Library** for testing React components.
* **Supertest** for API endpoint testing.
* **Cypress/Playwright** for end-to-end testing to simulate real user interaction.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## Features

* **Marketplace**: A dedicated space where contractors and clients can interact.
* **Bid Generation**: A tool that generates custom bids based on project data.
* **Compliance Tracking**: Real-time monitoring to ensure projects comply with local building codes.
* **PWA**: Offline functionality and fast load times, even on unreliable networks.

## Contributing

We welcome contributions to MC-Hub! If you'd like to help improve the platform, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Submit a pull request.

Please make sure that your code adheres to the existing code style and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
