import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

/**
 * Crea el cliente de Supabase de forma segura
 * (evita que la app crashee si algo está mal)
 */
function getSupabase() {
  const url = (process.env.SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!url) throw new Error("Falta SUPABASE_URL en Vercel");
  if (!/^https?:\/\/.+/.test(url)) {
    throw new Error(`SUPABASE_URL inválida: "${url}"`);
  }
  if (!key) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en Vercel");

  return createClient(url, key);
}

/**
 * Ruta raíz – para comprobar que la API está viva
 */
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API viva",
    has_SUPABASE_URL: !!process.env.SUPABASE_URL,
    has_SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
});

/**
 * Listar tablas de la base de datos
 * (usa la función SQL get_tables)
 */
app.get("/tablas", async (req, res) => {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase.rpc("get_tables");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Leer TODOS los registros de la tabla EstudiantesHP
 */
app.get("/estudiantes", async (req, res) => {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("EstudiantesHP")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * (Extra opcional) Leer cualquier tabla por nombre
 * /tabla/EstudiantesHP
 */
app.get("/tabla/:nombre", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { nombre } = req.params;

    const { data, error } = await supabase
      .from(nombre)
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
