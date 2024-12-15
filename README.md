# NestJS Authentication with JWT

This repository demonstrates how to implement user authentication in a NestJS application using JWT (JSON Web Tokens). The project is designed to provide a clean and modular structure for authentication and authorization processes.

## Features

- **User Authentication**: Secure user login with JWT.
- **Registration System**: Allows users to create accounts.
- **Role-Based Authorization**: Define and manage user roles.
- **Validation**: Ensures proper input data for registration and login.
- **Environment Configuration**: `.env` file for managing sensitive configurations.
- **Scalable Structure**: Modular and extensible for adding more features.

## Tech Stack

- **NestJS**: Framework for building scalable server-side applications.
- **JWT**: Secure token-based authentication.
- **TypeScript**: Strongly typed programming language for better development experience.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- A compatible database (e.g., PostgreSQL)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ismetcanbyk/NestJs-Auth-Jwt.git
   cd NestJs-Auth-Jwt
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the project root and configure the following variables:

   ```env
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   PORT=8082
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run start:dev
   ```

2. Access the API at `http://localhost:8082`.

### Testing

Run the test suite:

```bash
npm run test
```

## API Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT.
- **GET /profile**: Access the authenticated user's profile (requires valid JWT).

## Folder Structure

- **src/auth**: Contains authentication logic, guards, and strategies.
- **src/users**: User entity and service for user management.
- **src/common**: Shared modules, pipes, and filters.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
