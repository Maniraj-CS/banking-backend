 <div align="center">

# 🏦 Banking Backend

### Secure Banking REST API

Building a scalable and secure backend for modern banking applications.

<br/>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<br/>

[Overview](#-overview) · [Features](#-features) · [Architecture](#-architecture) · [API](#-api-endpoints) · [Setup](#-getting-started)

</div>

---

## 📌 Overview

Banking Backend is a REST API project built using **Node.js, Express.js, TypeScript, and MongoDB**.

The project focuses on building backend infrastructure for banking applications, including user authentication, account-related functionality, and database management.

It uses JWT authentication, password hashing, and Docker-based local infrastructure.

## ✨ Features

### 🔐 Authentication

- User registration.
- User login.
- JWT-based authentication.
- Password hashing with bcryptjs.
- Cookie-based token management.
- User logout.

### 🏦 Account Module

- Account module development.
- Banking account functionality.

### ⚙️ Backend Infrastructure

- TypeScript-based development.
- Express.js REST API.
- MongoDB database integration.
- Mongoose ODM.
- Docker Compose configuration.
- Environment-based configuration.

## 🏗️ Architecture

```mermaid
flowchart TB
    Client["Client Application"]
    API["Express.js API"]
    Routes["API Routes"]
    Auth["Authentication Controller"]
    Account["Account Module"]
    Middleware["Authentication Middleware"]
    DB[("MongoDB")]
    JWT["JWT Authentication"]
    Hash["bcryptjs"]

    Client --> API
    API --> Routes
    Routes --> Auth
    Routes --> Account
    Routes --> Middleware
    Middleware --> JWT
    Auth --> Hash
    Auth --> DB
    Account --> DB

    style Client fill:#172554,color:#fff,stroke:#3b82f6
    style API fill:#1e3a8a,color:#fff,stroke:#60a5fa
    style DB fill:#064e3b,color:#fff,stroke:#34d399
    style JWT fill:#312e81,color:#fff,stroke:#818cf8
```

## 🔄 Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant API as Express API
    participant Auth as Auth Controller
    participant DB as MongoDB

    User->>API: Register / Login
    API->>Auth: Process Request
    Auth->>DB: Find or Create User
    DB-->>Auth: User Information
    Auth->>Auth: Verify / Hash Password
    Auth->>Auth: Generate JWT
    Auth-->>User: Authentication Response
    User->>API: Logout
    API-->>User: Clear Authentication Cookie
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Type-safe development |
| Node.js | Runtime environment |
| Express.js 5 | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | Database modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cookie Parser | Cookie management |
| Nodemailer | Email functionality |
| Docker Compose | Container infrastructure |

## 📡 API Endpoints

Base URL:

```text
/api/v1
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login existing user |
| POST | `/auth/logout` | Logout user |

### Register

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your_password"
}
```

### Login

**Request:**

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

**Response fields:**

```json
{
  "userId": "USER_ID",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

*Example response fields; actual response may differ.*

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Docker
- Docker Compose
- Git

### 1. Clone Repository

```bash
git clone https://github.com/Maniraj-CS/banking-backend.git

cd banking-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/banking
JWT_SECRET=your_secret_key
```

Use the exact variable names required by your application configuration.

### 4. Run Development Server

```bash
npm run dev
```

### 5. Production Build

```bash
npm run build
npm start
```

## 📂 Project Structure

```text
banking-backend/
│
├── src/
│   └── Application source code
│
├── dist/
│   └── Compiled JavaScript
│
├── docker-compose.yml
├── mongoose.txt
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## 🔒 Security

- Password hashing with bcryptjs.
- JWT-based authentication.
- Cookie-based token management.
- Environment-based secret configuration.
- Protected API routes.

## 🗺️ Future Improvements

- [ ] Complete account management.
- [ ] Deposit and withdrawal operations.
- [ ] Fund transfers.
- [ ] Transaction history.
- [ ] Transaction validation.
- [ ] Automated testing.
- [ ] API documentation.
- [ ] Production deployment.

## 👨‍💻 Author

**Maniraj Pandit**

[GitHub](https://github.com/Maniraj-CS)

[Repository](https://github.com/Maniraj-CS/banking-backend)

---

<div align="center">

### Building reliable backend infrastructure.

⭐ If you find this project interesting, consider giving it a star!

</div>