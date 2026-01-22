import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// ✅ Crear cliente solo cuando se necesita (y validar env vars)
function getSupabase() {
  const url = (process.env.SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!url) throw new Error("Falta SUPABASE_URL en Vercel");
  if (!/^https?:\/\/.+/.test(url)) throw new Error(`SUPABASE_URL inválida: "${url}"`);
  if (!key) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en Vercel");

  return createClient(url, key);
}

// ✅ Ruta raíz: SIEMPRE responde (aunque Supabase esté mal)
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API viva",
    has_SUPABASE_URL: !!process.env.SUPABASE_URL,
    has_SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
});

// ✅ Ruta para tablas
app.get("/tablas", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.rpc("get_tables");
    if (error) return res.status(500).json({ error: error.message, details: error.details ?? null });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Ruta para estudiantes
app.get("/estudiantes", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("estudiantes").select("*");
    if (error) return res.status(500).json({ error: error.message, details: error.details ?? null });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
