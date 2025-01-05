# Project Overview

This project is a web application deployed on AWS, utilizing the NestJS framework, Redis, and PostgreSQL. The app is containerized using Docker, with PostgreSQL deployed on AWS RDS, and the app server and Redis hosted on EC2 instances.

## Project Structure

- **NestJS**: The backend of the application is built using the NestJS framework.
- **Redis**: Used for caching and message brokering.
- **PostgreSQL**: The relational database is deployed on AWS RDS for data storage.

## Architecture Overview

- **AWS EC2**: Hosting the application server and Redis.
- **AWS RDS**: Running PostgreSQL for data persistence.
- **Docker**: The entire application is containerized using Docker for ease of deployment and scalability.

## Deployed URLs

- **App Domain**: [http://adnan-abdullah.site](http://adnan-abdullah.site)
- **API Documentation**: [http://adnan-abdullah.site/api/docs](http://adnan-abdullah.site/api/docs)

## Getting Started

### Prerequisites

Before running the project locally, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (for local development, if needed)

### Running Locally

To run the application locally, use Docker Compose to build and start the containers. 

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Build the Docker containers:
   ```bash
   docker-compose build
   ```

3. Start the containers:
   ```bash
   docker-compose up
   ```

4. The application will be accessible locally at `http://localhost:3000` and the API documentation at `http://localhost:3000/api/docs`.

### Important Notes

- **Do not use** `npm run start` to start the application locally. The application is containerized using Docker, and the correct way to run it is through Docker Compose.

### Running in AWS (Production)

- The project is deployed on AWS, and the resources are already configured for production use, including the AWS EC2 instances for the app server and Redis, and PostgreSQL hosted on AWS RDS.

### Environment Variables

All configuration is handled through environment variables. You can specify the required variables in the `.env` file for local development or production. 

Some of the key environment variables include:

- **DATABASE_URL**: The connection string for PostgreSQL (for local development, this can be configured in `.env` or `docker-compose.yml`).
- **REDIS_URL**: The Redis connection string (for local development or production).
- **PORT**: The port the app will run on (default: `3001`).

No API keys are required for this project; all configurations are provided via the `.env` file.

### Database Setup

- The PostgreSQL database is hosted on AWS RDS. Ensure that the connection details are configured correctly.
- If running locally, Docker will automatically set up the database using `docker-compose.yml`.

### Accessing the API

The application exposes several API endpoints, and you can interact with them using the following:

- **GET** `/docs`: Access the API documentation (Swagger UI) for all available endpoints.
- **Other Endpoints**: Consult the API documentation for detailed endpoint information and usage.

### Redis Integration

Redis is used for caching and fast data storage. Make sure Redis is properly configured and running on AWS EC2 instances. The Redis connection details can be configured in the `.env` file or Docker Compose.

## Deployment

### AWS Setup

1. **EC2 Instances**:
   - The application server and Redis are deployed on AWS EC2 instances.
   - SSH access to these instances is required for management and troubleshooting.

2. **RDS**:
   - PostgreSQL is deployed on AWS RDS.
   - Ensure the database security groups and networking rules are correctly set up to allow connections from the EC2 instances.


This should now accurately reflect that no API key is needed and all configurations are handled via the `.env` file.
