
URL Shortener with Rate Limiting

This project is a URL shortener service built using NestJS, featuring rate limiting, caching, and database integration. It follows the MVC architecture and uses cookies for authentication, with Google OAuth for user login. Swagger is used for API documentation.

Features

MVC Architecture

: Separates the application into three interconnected components: Model, View, and Controller.

Rate Limiting

: Limits the number of requests per IP address to prevent abuse.

Cookie-Based Authentication

: Uses cookies to manage user sessions and authentication.

Google OAuth

: Allows users to log in using their Google accounts.

Caching

: Utilizes Redis for caching to improve performance and reduce database load.

Database Integration

: Uses PostgreSQL for storing URL mappings and user data.

API Documentation

: Swagger is used to document and test the API endpoints.

Environment Configuration

: Configurable via environment variables for flexibility across different environments.

Getting Started

Prerequisites

Node.js

PostgreSQL

Redis

Google Cloud Platform account

Installation

1. Clone the repository:

git clone

cd url-shortener

2. Install dependencies:

npm install

3. Set up your environment variables in a .env

file:

DB_HOST=your_database_host

DB_PORT=your_database_port

DB_USERNAME=your_database_username

DB_PASSWORD=your_database_password

DB_NAME=your_database_name

REDIS_HOST=your_redis_host

REDIS_PORT=your_redis_port

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_SECRET=your_google_secret

GOOGLE_CALLBACK_URL=your_google_callback_url

NODE_ENV=development

4. Register your application with Google:

Go to Google Cloud Console

.

Create a new project or select an existing one.

Navigate to the "Credentials" section.

Click "Create credentials" and select "OAuth 2.0 Client IDs".

Configure the consent screen and set the authorized redirect URI to match your GOOGLE_CALLBACK_URL

.

Running the Application

1. Start the application:

npm run start

2. The application will be running at http://localhost:3000

.

3. Access the API documentation at http://localhost:3000/docs

.

Configuration

Rate Limiting

: Configured to allow 10 requests per minute per IP address. This can be adjusted in the app.module.ts

file under the ThrottlerModule

configuration.

Database

: Ensure your PostgreSQL database is set up and accessible with the credentials provided in the .env

file.

Caching

: Redis is used for caching. Ensure your Redis server is running and accessible.

Authentication

: Uses JWT stored in cookies for session management. Ensure your JWT_SECRET

is set in the .env

file.

Swagger

: API documentation is set up using Swagger, accessible at /docs

.

Project Structure

src/main.ts

: Entry point of the application, sets up Swagger and other configurations.

src/app.controller.ts

: Main application controller handling root and health check routes.

src/modules/auth

: Contains authentication logic, including Google OAuth and JWT-based session management.

src/modules/url-shortener

: Contains the URL shortener module and related logic.

src/guards/auth.guard.ts

: Custom authentication guard for protecting routes.

src/models

: Contains database entity models.

