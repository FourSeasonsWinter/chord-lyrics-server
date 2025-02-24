const pool = require("../db");

exports.createSong = async (title, artist) => {
  const result = await pool.query(
    "INSERT INTO songs (title, artist) VALUES ($1, $2)",
    [title, artist]
  );
  return result.rows[0];
};

exports.getAllSongs = async () => {
  const result = await pool.query("SELECT * FROM songs");
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);
  return result.rows[0];
};
