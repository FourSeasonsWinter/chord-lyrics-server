import express from "express";
import { getLinesBySongId, save } from "../models/lyricsModel.js";
const router = express.Router();

router.get("/:songid", async (req, res) => {
  const songId = req.params.songid;

  try {
    const lines = await getLinesBySongId(songId);
    res.status(200).json(lines);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.post("/", async (req, res) => {
  const { songId, lines } = req.body;

  try {
    await save(songId, lines);
    res.status(200).json({ message: "lyrics saved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

export default router;
