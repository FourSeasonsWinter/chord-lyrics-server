import pool from "../db.js";

export async function createUser(user) {
  const { id, name, email, provider } = user;

  const result = await pool.query(
    "INSERT INTO users (id, name, email, provider) VALUES ($1, $2, $3, $4)",
    [id, name, email, provider]
  );
  return result.rows[0];
}

export async function findById(id) {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}
