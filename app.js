import { config } from "dotenv";
import express from "express";
import cors from "cors";
const app = express();
config();

// Import routes
import usersRouter from "./routes/users.js";
import songsRouter from "./routes/songs.js";
import lyricsRouter from "./routes/lyrics.js";

// Middleware
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/songs", songsRouter);
app.use("/lyrics", lyricsRouter);

export default app;
