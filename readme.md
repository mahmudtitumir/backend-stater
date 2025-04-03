# Backend Starter

This is a starter template for building a backend application using Node.js, Express, TypeScript, and MongoDB.

## Features

-   **Authentication**: User registration and login with session-based authentication.
-   **User Management**: CRUD operations for user data.
-   **Middleware**: Authentication and ownership checks.
-   **Database**: MongoDB integration with Mongoose.
-   **TypeScript**: Strongly typed codebase for better maintainability.
-   **Development Tools**: Nodemon for live reloading and TypeScript for modern JavaScript development.

## Project Structure

```plaintext
backendStarter/
.env
.gitignore
nodemon.json
package.json
tsconfig.json
src/
    index.ts
    controllers/
        authentication.ts
        users.ts
    db/
        users.ts
    helpers/
        index.ts
    middlewares/
        index.ts
    router/
        authentication.ts
        index.ts
        users.ts
```

## Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB instance (local or cloud)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/mahmudtitumir/backend-stater.git
    cd backendStarter
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

-   Create a `.env` file in the root directory.
-   Add your MongoDB connection string:
    ```
    MONGODB_URL='your-mongodb-connection-string'
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    The server will run at `http://localhost:8081`.

## API Endpoints

### Authentication

-   **POST** `/auth/register`: Register a new user.
-   **POST** `/auth/login`: Log in an existing user.

### Users

-   **GET** `/users`: Get all users (requires authentication).
-   **DELETE** `/users/:userId`: Delete a user by ID (requires authentication and ownership).
-   **PATCH** `/users/:userId`: Update a user's username (requires authentication and ownership).

## Development

-   **TypeScript Compilation**: The project uses TypeScript for type safety. The configuration is in `tsconfig.json`.
-   **Nodemon**: Automatically restarts the server on file changes.

## License

## This project is licensed under the ISC License.
