export default function handler(req, res) {
  try {
    const raw = process.env.DATABASE_URL || "";
    const u = new URL(raw);
    res.status(200).json({
      ok: true,
      hostname: u.hostname,
      hasPassword: Boolean(u.password),
    });
  } catch (e) {
    res.status(200).json({
      ok: false,
      message: "DATABASE_URL missing or invalid",
    });
  }
}