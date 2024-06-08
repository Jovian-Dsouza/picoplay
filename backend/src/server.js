const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const redis = require("redis");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
require("dotenv").config();
const TournamentManager = require("./TournamentManager");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const redisClient = redis.createClient();
const prisma = new PrismaClient();

const tournamentManager = new TournamentManager(io);

async function readAndSendQuestion(socket) {
  try {
    // Read the first question from the Prisma database
    const question = await prisma.question.findFirst();
    // Calculate the end_timestamp as current time + 20 seconds
    const end_timestamp = dayjs().add(20, "second").valueOf();
    if (question) {
      socket.emit("question", {
        question_id: question.question_id,
        question_text: question.question_text,
        answer_1: question.answer_1,
        answer_2: question.answer_2,
        answer_3: question.answer_3,
        answer_4: question.answer_4,
        image_url: question.image_url,
        end_timestamp: end_timestamp,
      });
    } else {
      socket.emit("question", { error: "No questions found" });
    }
  } catch (error) {
    console.error("Error fetching first question:", error);
    socket.emit("question", { error: "Error fetching question" });
  }
}

// WebSocket connection
// TODO add auth middleware
io.on("connection", async (socket) => {
  console.log("New client connected");
  readAndSendQuestion(socket);

  socket.on("submitAnswer", (data) => {
    console.log(
      `Received answer: ${data.answer} for question ID: ${data.question_id}`
    );
    // Handle the received answer (e.g., save it to a database, check correctness, etc.)
  });

  // check if the tournament has started if the tournament has started then send meta data to that client
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your frontend URL
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/startTournament/:tournamentId", async (req, res) => {
  try {
    const tournamentId = parseInt(req.params.tournamentId);
    if (isNaN(tournamentId)) {
      return res.status(400).send("Invalid tournament ID");
    }

    await tournamentManager.startTournament(tournamentId);
    res.send(`Started Tournament ${tournamentId}`);
  } catch (error) {
    console.error(`Error in /startTournament endpoint:`, error);
    res.status(500).send("Error starting tournament");
  }
});

// TODO remove
app.get("/questions", async (req, res) => {
  const questions = await prisma.question.findMany();
  res.json(questions);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
