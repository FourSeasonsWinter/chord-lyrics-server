import express from 'express'
import { createSong, getAllSongs, findById } from '../models/songModel.js';
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getAllSongs();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await findById(id);

    if (!result)
      res.status(404).json({ message: 'song id not found' })

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.post("/", async (req, res) => {
  const { title, artist, userId } = req.body;

  try {
    await createSong(title, artist, userId);
    res.status(201).json({ message: title + " saved to db" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error saving to db" });
  }
});

export default router;
