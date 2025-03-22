import express from "express";
import { save } from "../models/lyricsModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { songId, lines } = req.body;

  try {
    save(songId, lines);
    res.status(200).json({ message: "lyrics saved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

export default router;