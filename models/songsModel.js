import pool from "../db.js";

export async function createSong(userId, details) {
  const { title, artist } = details;

  const result = await pool.query(
    "INSERT INTO songs (user_id, title, artist) VALUES ($1, $2, $3) RETURNING id",
    [userId, title, artist]
  );
  return result.rows[0].id;
}

export async function getPopularSongs() {
  // TODO - query most accessed songs
  const result = await pool.query("SELECT * FROM songs LIMIT 6");
  return result.rows;
}

export async function findById(id) {
  const result = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);
  return result.rows[0];
}

export async function findByQuery(query) {
  const pattern = `%${query}%`;
  const result = await pool.query(
    "SELECT * FROM songs WHERE title ILIKE $1 OR artist ILIKE $1",
    [pattern]
  );
  return result.rows;
}

export async function findByUserId(userId) {
  const result = await pool.query("SELECT * FROM songs WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
}
