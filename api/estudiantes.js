import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const result = await pool.query(
      'select * from public."EstudiantesHP" order by id asc;'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "DB error", detail: error.message });
  }
}
