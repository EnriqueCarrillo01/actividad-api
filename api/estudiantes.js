import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET /api/estudiantes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        created_at,
        "Nombre",
        "Casa",
        "Materia destacada"
      FROM public."EstudiantesHP"
      ORDER BY id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DB error", detail: error.message });
  }
});

// POST /api/estudiantes
router.post("/", async (req, res) => {
  try {
    const { nombre, casa, materiaDestacada } = req.body;

    if (!nombre || !casa) {
      return res
        .status(400)
        .json({ error: "Faltan datos", detail: "nombre y casa son obligatorios" });
    }

    const result = await pool.query(
      `
      INSERT INTO public."EstudiantesHP" ("Nombre", "Casa", "Materia_destacada")
      VALUES ($1, $2, $3)
      RETURNING id, created_at, "Nombre", "Casa", "Materia_destacada"
      `,
      [nombre, casa, materiaDestacada ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "DB error", detail: error.message });
  }
});

export default router;
