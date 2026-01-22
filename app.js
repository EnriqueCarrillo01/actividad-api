import express from "express";
import estudiantesRouter from "./api/estudiantes.js";

const app = express();

app.use(express.json());

// Ruta base para probar rápido
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API funcionando ✅",
    endpoints: ["/api/estudiantes"],
  });
});

// Rutas
app.use("/api/estudiantes", estudiantesRouter);

export default app;
