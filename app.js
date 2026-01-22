import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

// GET: devuelve todos los estudiantes (JSON)
app.get("/api/estudiantes", async (req, res) => {
  try {
    const r = await pool.query('select * from public."EstudiantesHP" order by id asc;');
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ error: "DB error", detail: String(err.message ?? err) });
  }
});

// GET: uno por id
app.get("/api/estudiantes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const r = await pool.query('select * from public."EstudiantesHP" where id = $1;', [id]);
    if (r.rows.length === 0) return res.status(404).json({ error: "No encontrado" });
    res.json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "DB error", detail: String(err.message ?? err) });
  }
});

export default app;
