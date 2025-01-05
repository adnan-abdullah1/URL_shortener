
# URL Shortener 

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

- **Node.js**
- **PostgreSQL**
- **Redis**
- **Google Cloud Platform account**

---

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up your environment variables** in a `.env` file:

   ```env
   # GOOGLE secrets
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_SECRET=your_google_secret
   GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

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

4. **Register your application with Google**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Navigate to the **Credentials** section.
   - Click **Create credentials** and select **OAuth 2.0 Client IDs**.
   - Configure the consent screen and set the authorized redirect URI to match your `GOOGLE_CALLBACK_URL` (e.g., `http://localhost:3001/auth/google/callback`).

---

### Running the Application

1. **Start the application**:

   ```bash
   npm run start
   ```

2. The application will be running at `http://localhost:3001`.

3. Access the **API documentation** at `http://localhost:3001/docs`.

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

## Project

The project follows the MVC architecture,

---

## API Docs

The API documentation can be accessed at `http://localhost:3001/docs`.

---

## Environment Variables

Ensure your `.env` file is configured with the correct values for local and production environments.

```env
# GOOGLE secrets
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Database configuration
DB_HOST=database-1.cbsus4csg3s5.us-east-1.rds.amazonaws.com
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
JWT_SECRET=qm91skxrpyxdqjzj
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


