const pool = require("../db");

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const sql = `
      SELECT 
        id,
        "Nombre" AS nombre,
        "Casa" AS casa,
        materia_destacada
      FROM "EstudiantesHP"
      ORDER BY id;
    `;

    const { rows } = await pool.query(sql);
    return res.status(200).json(rows);
  } catch (error) {
    // Para que NO salga la pantalla bonita de Vercel y sí te devuelva el error real
    return res.status(500).json({
      error: "DB error",
      message: error.message,
      hint:
        "Revisa que la columna exista (materia_destacada) y que DATABASE_URL esté bien (sin saltos y con contraseña).",
    });
  }
};
