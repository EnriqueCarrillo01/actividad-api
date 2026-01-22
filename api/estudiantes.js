const pool = require("../db");

module.exports = async (req, res) => {
  // Solo permitimos GET
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const result = await pool.query(`
      SELECT 
        id,
        nombre,
        casa,
        materia_destacada
      FROM estudiantes
      ORDER BY id
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: "DB error",
      detail: error.message
    });
  }
};
