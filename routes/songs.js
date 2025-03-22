import express from "express";
import {
  createSong,
  getPopularSongs,
  findById,
  findByQuery,
  findByUserId,
} from "../models/songsModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getPopularSongs();
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

    if (!result) res.status(404).json({ message: "song id not found" });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

router.get("/query/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const result = await findByQuery(query);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await findByUserId(id);

    if (!result)
      res
        .status(404)
        .json({ message: "no songs created by this user id was found" });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

router.post("/", async (req, res) => {
  const { userId, details } = req.body;

  try {
    const id = await createSong(userId, details);
    res.status(201).json({ id: id });
  } catch (err) {
    console.error(err);
    res.status(500).send("error saving to db");
  }
});

export default router;
