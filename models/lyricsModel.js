import pool from "../db.js";

export async function save(songId, lines) {
  for (const line of lines) {
    await pool.query(
      "INSERT INTO lyrics (song_id, line_number, lyric_text, chords_text) VALUES ($1, $2, $3, $4)",
      [songId, line.lineNumber, line.lyrics, line.chords]
    );
  }
}
