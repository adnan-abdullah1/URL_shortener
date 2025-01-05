Project Overview
http://adnan-abdullah.site
This project is a web application deployed on AWS, utilizing the NestJS framework, Redis, and PostgreSQL. The app is containerized using Docker, with PostgreSQL deployed on AWS RDS, and the app server and Redis hosted on EC2 instances.

Project Structure
NestJS: The backend of the application is built using the NestJS framework.
Redis: Used for caching and message brokering.
PostgreSQL: The relational database is deployed on AWS RDS for data storage.
Architecture Overview
AWS EC2: Hosting the application server and Redis.
AWS RDS: Running PostgreSQL for data persistence.
Docker: The entire application is containerized using Docker for ease of deployment and scalability.
Deployed URLs
App Domain: http://adnan-abdullah.site
API Documentation: http://adnan-abdullah.site/api/docs
Getting Started
Prerequisites
Before running the project locally, ensure you have the following installed:

Docker
Docker Compose
Node.js (for local development)
Running Locally
Clone the repository:

# URL_shortenerProject Overview

This project is a web application deployed on AWS, utilizing the NestJS framework, Redis, and PostgreSQL. The app is containerized using Docker, with PostgreSQL deployed on AWS RDS, and the app server and Redis hosted on EC2 instances.

Project Structure
NestJS: The backend of the application is built using the NestJS framework.
Redis: Used for caching and message brokering.
PostgreSQL: The relational database is deployed on AWS RDS for data storage.
Architecture Overview
AWS EC2: Hosting the application server and Redis.
AWS RDS: Running PostgreSQL for data persistence.
Docker: The entire application is containerized using Docker for ease of deployment and scalability.
Deployed URLs
App Domain: http://adnan-abdullah.site
API Documentation: http://adnan-abdullah.site/api/docs
Getting Started
Prerequisites
Before running the project locally, ensure you have the following installed:

Docker
Docker Compose
Node.js (for local development)
Running Locally
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <project-directory>
Build the Docker containers:

bash
Copy code
docker-compose build
Start the containers:

bash
Copy code
docker-compose up
The application will be accessible locally at http://localhost:3000 and the API documentation at http://localhost:3000/api/docs.

Running in AWS (Production)
The project is deployed on AWS, and the resources are already configured for production use, including the AWS EC2 instances for the app server and Redis, and PostgreSQL hosted on AWS RDS.
Environment Variables
Ensure that the following environment variables are set correctly for local development or production:

DATABASE_URL: The connection string for PostgreSQL (for local development, this can be configured in .env or docker-compose.yml).
REDIS_URL: The Redis connection string (for local development or production).
PORT: The port the app will run on (default: 3000).
API_KEY: Your API key for accessing certain endpoints (if applicable).
Database Setup
The PostgreSQL database is hosted on AWS RDS. Ensure that the connection details are configured correctly.
If running locally, Docker will automatically set up the database using docker-compose.yml.
Accessing the API
The application exposes several API endpoints, and you can interact with them using the following:

GET /api/docs: Access the API documentation (Swagger UI) for all available endpoints.
Other Endpoints: Consult the API documentation for detailed endpoint information and usage.
Redis Integration
Redis is used for caching and fast data storage. Make sure Redis is properly configured and running on AWS EC2 instances. The Redis connection details can be configured in the .env file or Docker Compose.

Deployment
AWS Setup
EC2 Instances:

The application server and Redis are deployed on AWS EC2 instances.
SSH access to these instances is required for management and troubleshooting.
RDS:

PostgreSQL is deployed on AWS RDS.
Ensure the database security groups and networking rules are correctly set up to allow connections from the EC2 instances.
Continuous Integration/Continuous Deployment (CI/CD)
The project can be set up with a CI/CD pipeline (e.g., GitHub Actions, CircleCI) to automate deployment to AWS upon code changes.
Troubleshooting
If you encounter any issues:

Check Logs: Check Docker container logs using docker-compose logs for any errors.
Redis Connection: Ensure Redis is running and accessible from the application.
Database Issues: Verify the database connection string and ensure the RDS instance is running and accessible from EC2.
Contributing
If you'd like to contribute to this project, feel free to fork it and create a pull request with your changes. Please ensure that you follow the coding conventions and provide adequate tests for new features.

License
This project is licensed under the MIT License.
bash
Copy code
git clone https://github.com/adnan-abdullah1/URL_shortener
cd URL_shortener
Build the Docker containers:

bash
Copy code
docker-compose build
Start the containers:

bash
Copy code
docker-compose up
The application will be accessible locally at http://localhost:3000 and the API documentation at http://localhost:3000/docs.

Running in AWS (Production)
The project is deployed on AWS, and the resources are already configured for production use, including the AWS EC2 instances for the app server and Redis, and PostgreSQL hosted on AWS RDS.
Environment Variables
Ensure that the following environment variables are set correctly for local development or production:

DATABASE_URL: The connection string for PostgreSQL (for local development, this can be configured in .env or docker-compose.yml).
REDIS_URL: The Redis connection string (for local development or production).
PORT: The port the app will run on (default: 3000).
API_KEY: Your API key for accessing certain endpoints (if applicable).
Database Setup
The PostgreSQL database is hosted on AWS RDS. Ensure that the connection details are configured correctly.
If running locally, Docker will automatically set up the database using docker-compose.yml.
Accessing the API
The application exposes several API endpoints, and you can interact with them using the following:

GET /api/docs: Access the API documentation (Swagger UI) for all available endpoints.
Other Endpoints: Consult the API documentation for detailed endpoint information and usage.
Redis Integration
Redis is used for caching and fast data storage. Make sure Redis is properly configured and running on AWS EC2 instances. The Redis connection details can be configured in the .env file or Docker Compose.

Deployment
AWS Setup
EC2 Instances:

The application server and Redis are deployed on AWS EC2 instances.
SSH access to these instances is required for management and troubleshooting.
RDS:

PostgreSQL is deployed on AWS RDS.
Ensure the database security groups and networking rules are correctly set up to allow connections from the EC2 instances.
Continuous Integration/Continuous Deployment (CI/CD)
The project can be set up with a CI/CD pipeline (e.g., GitHub Actions, CircleCI) to automate deployment to AWS upon code changes.
Troubleshooting
If you encounter any issues:

Check Logs: Check Docker container logs using docker-compose logs for any errors.
Redis Connection: Ensure Redis is running and accessible from the application.
Database Issues: Verify the database connection string and ensure the RDS instance is running and accessible from EC2.
Contributing
If you'd like to contribute to this project, feel free to fork it and create a pull request with your changes. Please ensure that you follow the coding conventions and provide adequate tests for new features.

License
This project is licensed under the MIT License.
