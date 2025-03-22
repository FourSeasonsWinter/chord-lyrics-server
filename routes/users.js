import express from "express";
import { createUser, findById } from "../models/usersModel.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findById(id);

    if (!user) {
      res.status(404).json({ message: "user id not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

router.post("/", async (req, res) => {
  const user = req.body;

  try {
    await createUser(user);
    res.status(201).json({ message: user.name + " saved to db" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error saving user to db" });
  }
});

export default router;
