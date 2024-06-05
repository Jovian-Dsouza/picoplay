const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');
const { PrismaClient } = require("@prisma/client");
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const redisClient = redis.createClient();

console.log(process.env.DATABASE_URL)
const prisma = new PrismaClient();

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
