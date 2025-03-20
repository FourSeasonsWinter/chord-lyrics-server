import pool from '../db.js'

export async function createSong(title, artist, userId) {
  const result = await pool.query(
    "INSERT INTO songs (title, artist, user_id) VALUES ($1, $2, $3)",
    [title, artist, userId]
  );
  return result.rows[0];
};

export async function getAllSongs() {
  const result = await pool.query("SELECT * FROM songs");
  return result.rows;
};

export async function findById(id) {
  const result = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);
  return result.rows[0];
};
