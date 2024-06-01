# Picoplay

Picoplay is a global real-time math puzzle platform that allows users to participate in math puzzles and tournaments. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [License](#license)

## Features

- Real-time math puzzles and tournaments
- User authentication via wallet login (Solana blockchain)
- Live leaderboard
- Responsive and intuitive UI
- Scalable and high-performance backend

## Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- WebSocket for real-time communication

**Backend:**
- Express.js
- Redis for caching and WebSocket management
- PostgreSQL for storing puzzles, user data, and game results
- MongoDB for additional data storage

**Deployment:**
- Docker
- Railway.app for hosting

## Getting Started

### Prerequisites

- Node.js and npm
- Docker
- Solana CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jovian-Dsouza/picoplay.git
   cd picoplay

2. Install dependencies for both frontend and backend:
```bash
cd frontend
npm install
cd ../backend
npm install
```

## Running the Project

1. Start Docker services (PostgreSQL, Redis, and MongoDB):

```bash
docker-compose up -d
```
Run the backend server:

```bash
cd backend
npm run dev
```
Run the frontend server:

```bash
cd ../frontend
npm run dev
```
Open your browser and navigate to http://localhost:3000 to access Picoplay.

## License
This project is licensed under the MIT License.