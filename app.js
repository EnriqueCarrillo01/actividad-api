import express from "express";
import { createClient } from "@supabase/supabase-js";

import { getTablas } from "./api/tablas.js";
import { getEstudiantes } from "./api/estudiantes.js";

const app = express();
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Root
app.get("/", (req, res) => {
  res.send("Está funcionando");
});

// ✅ Ruta para tablas
app.get("/tablas", async (req, res) => {
  try {
    const tablas = await getTablas(supabase);
    res.json(tablas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Ruta para estudiantes
app.get("/estudiantes", async (req, res) => {
  try {
    const estudiantes = await getEstudiantes(supabase);
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
