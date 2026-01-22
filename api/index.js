module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API activa",
    endpoints: ["/api/estudiantes", "/api/debug"],
  });
};
