import { config } from "dotenv";
import express from "express";
import cors from "cors";
const app = express();
config();

// Import routes
import songsRouter from "./routes/songs.js";

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
app.use("/songs", songsRouter);

export default app;
