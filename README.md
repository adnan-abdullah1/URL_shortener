
# URL Shortener 
App URL: http://adnan-abdullah.site
This project is a **URL shortener service** built using **NestJS**, featuring **rate limiting**, **caching**, and **database integration**. It follows the **MVC architecture** and uses **cookies for authentication** with **Google OAuth** for user login. **Swagger** is used for API documentation.

## Features

- **MVC Architecture**: Separates the application into three interconnected components: Model, View, and Controller.
- **Rate Limiting**: Limits the number of requests per IP address to prevent abuse.
- **Cookie-Based Authentication**: Uses cookies to manage user sessions and authentication.
- **Google OAuth**: Allows users to log in using their Google accounts.
- **Caching**: Utilizes **Redis** for caching to improve performance and reduce database load.
- **Database Integration**: Uses **PostgreSQL** for storing URL mappings and user data.
- **API Documentation**: Swagger is used to document and test the API endpoints.
- **Environment Configuration**: Configurable via environment variables for flexibility across different environments.

---

## Getting Started

### Prerequisites

To run this project locally, you’ll need the following:

- **Docker** (for containerized deployment)
- **Docker Compose** (for managing multiple services like Redis and PostgreSQL)
- **Google Cloud Platform account** (for Google OAuth integration)

---

### Installation

#### Method 1: Running with Docker Compose

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Create a `.env` file** in the project root with the necessary environment variables. For example:

   ```env
   # GOOGLE secrets
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_SECRET=your_google_secret
   GOOGLE_CALLBACK_URL=

   # Database configuration
   DB_HOST=your_database_host
   DB_PORT=5432
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   POSTGRES_PASSWORD=your_postgres_password

   # Application 
   NODE_ENV=development
   PORT=3001

   # Redis
   REDIS_PORT=6379
   REDIS_HOST=localhost

   # JWT secret
   JWT_SECRET=your_jwt_secret
   ```

3. **Start the services with Docker Compose**:

   ```bash
   docker-compose up --build
   ```

   This will start the following containers:

   - **NestJS application** (running on port `3001`)
   - **PostgreSQL** (for storing URL mappings and user data)
   - **Redis** (for caching)

   The application will be accessible at `http://localhost:3001`.

---

#### Method 2: Running without Docker Compose

If you prefer not to use Docker Compose and run the app manually:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up your environment variables** in a `.env` file (refer to the `.env` example above).

4. **Start the application**:

   ```bash
   npm run start
   ```

   The application will be running at `http://localhost:3001`.

---

### Running the Application with Docker Compose

1. The application will be running at `http://localhost:3001`.
2. Access the **API documentation** at `http://localhost:3001/docs`.

---

## Configuration

### Rate Limiting

- Configured to allow **10 requests per minute per IP address**. This can be adjusted in the `app.module.ts` file under the `ThrottlerModule` configuration.

### Database

- Ensure your **PostgreSQL** database is set up and accessible with the credentials provided in the `.env` file.

### Caching

- **Redis** is used for caching. Ensure your **Redis server** is running and accessible.

### Authentication

- Uses **JWT** stored in cookies for session management. Ensure your `JWT_SECRET` is set in the `.env` file.

### Swagger

- **API documentation** is set up using Swagger, accessible at `/docs`.

---



## Environment Variables

Ensure your `.env` file is configured with the correct values for local and production environments.

```env
# GOOGLE secrets
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=alter_db
POSTGRES_PASSWORD=pgpasswd

# Application 
NODE_ENV=development
PORT=3001

# Redis
REDIS_PORT=6379
REDIS_HOST=localhost

# JWT secret
JWT_SECRET=qm91skxrpyxdjzj
```

---

## Rate Limiting Configuration

The rate limiting configuration is handled in `app.module.ts` using `ThrottlerModule`:

```typescript
ThrottlerModule.forRoot({
  ttl: 60,  // 1 minute
  limit: 10, // 10 requests per minute per IP
}),
```

---

