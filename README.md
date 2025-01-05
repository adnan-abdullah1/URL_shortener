Here's an improved version of your README file using proper markdown for better readability and organization:

---

# URL Shortener with Rate Limiting

This project is a URL shortener service built using **NestJS**, featuring **rate limiting**, **caching**, and **database integration**. It follows the **MVC architecture** and uses **cookies** for authentication with **Google OAuth** for user login. **Swagger** is used for API documentation.

## Features

- **MVC Architecture**: Separates the application into three interconnected components: Model, View, and Controller.
- **Rate Limiting**: Limits the number of requests per IP address to prevent abuse.
- **Cookie-Based Authentication**: Uses cookies to manage user sessions and authentication.
- **Google OAuth**: Allows users to log in using their Google accounts.
- **Caching**: Utilizes **Redis** for caching to improve performance and reduce database load.
- **Database Integration**: Uses **PostgreSQL** for storing URL mappings and user data.
- **API Documentation**: **Swagger** is used to document and test the API endpoints.
- **Environment Configuration**: Configurable via environment variables for flexibility across different environments.

## Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js** (version 14 or higher)
- **PostgreSQL**
- **Redis**
- **Google Cloud Platform account** (for Google OAuth credentials)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and populate it with the following variables:

```env
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
```

### 4. Register Your Application with Google

To integrate Google OAuth, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to the **Credentials** section.
4. Click **Create credentials** and select **OAuth 2.0 Client IDs**.
5. Configure the consent screen and set the authorized redirect URI to match your `GOOGLE_CALLBACK_URL`.

## Running the Application

### 1. Start the Application

Run the following command to start the application:

```bash
npm run start
```

### 2. Access the Application

The application will be running at [http://localhost:3000](http://localhost:3000).

### 3. Access the API Documentation

You can access the API documentation via Swagger at [http://localhost:3000/docs](http://localhost:3000/docs).

## Configuration

### Rate Limiting

Rate limiting is configured to allow **10 requests per minute** per IP address. You can adjust this setting in the `app.module.ts` file under the `ThrottlerModule` configuration.

### Database

Ensure your PostgreSQL database is set up and accessible with the credentials provided in the `.env` file. You can use tools like **pgAdmin** or **psql** to manage your database.

### Caching

Redis is used for caching. Make sure your Redis server is running and accessible with the credentials provided in the `.env` file.

### Authentication

JWT is used for session management and is stored in cookies. Ensure the `JWT_SECRET` is set in the `.env` file.

### Swagger

API documentation is set up using Swagger and can be accessed at `/docs`.

