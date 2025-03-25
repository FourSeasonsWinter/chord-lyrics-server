import pool from "../db.js";

export async function getLinesBySongId(songId) {
  const result = await pool.query("SELECT * FROM lyrics WHERE song_id = $1", [
    songId,
  ]);

  return result.rows;
}

export async function save(songId, lines) {
  for (const line of lines) {
    await pool.query(
      "INSERT INTO lyrics (song_id, lyric_text, chords_text) VALUES ($1, $2, $3)",
      [songId, line.lyrics, line.chords]
    );
  }
}

export async function update(songId, lines) {
  await pool.query(
    "DELETE FROM lyrics WHERE song_id = $1",
    [songId]
  )

  save(songId, lines);
}
