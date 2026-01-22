const pool = require("../db");

module.exports = async (req, res) => {
  // Solo GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // OJO: "EstudiantesHP" es tu tabla (con mayúsculas), por eso lleva comillas
    // "Nombre" y "Casa" también llevan comillas
    // materia_destacada ya NO lleva comillas si ya renombraste la columna
    const { rows } = await pool.query(`
      SELECT 
        id,
        "Nombre" AS nombre,
        "Casa" AS casa,
        materia_destacada
      FROM "EstudiantesHP"
      ORDER BY id;
    `);

    return res.status(200).json(rows);
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({
      error: "DB error",
      detail: error.message
    });
  }
};
