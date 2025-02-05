import dotenv from "dotenv"
dotenv.config();
import express from "express";
import { query } from "./db.js";

const app = express();

app.use(express.json());

app.get("/data", async (req, res) => {
  try {
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_PORT:", process.env.DB_PORT);
    console.log("DB_DATABASE:", process.env.DB_DATABASE);

    const result = await query("SELECT * FROM songs");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(5000, () => {
  console.log("server started");
});
