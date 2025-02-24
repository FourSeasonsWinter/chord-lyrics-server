const express = require("express");
const router = express.Router();

const { createSong, getAllSongs, findById } = require("../models/songModel");

router.get("/", async (req, res) => {
  try {
    const result = await getAllSongs()
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { title, artist } = req.body;

  try {
    await createSong(title, artist);
    res.status(201).json({ message: title + " saved to db" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error saving to db" });
  }
});

module.exports = router;
