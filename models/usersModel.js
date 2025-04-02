import pool from "../db.js";

export async function createUser(user) {
  const { id, name, email } = user;

  const result = await pool.query(
    "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
    [id, name, email]
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
