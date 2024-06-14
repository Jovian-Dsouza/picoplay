import express, { json } from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { createClient } from "redis";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
require("dotenv").config();
import TournamentManager from "./TournamentManager";
import Coordinator from "./Coordinator";

const app = express();
const server = createServer(app);
const io = new SocketIoServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const redisClient = createClient();
const prisma = new PrismaClient();
const coordinator = new Coordinator(io, redisClient);
const tournamentManager = new TournamentManager(prisma, coordinator);

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Replace with your frontend URL
  })
);
app.use(json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

//TODO: make this only admin accessible
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
