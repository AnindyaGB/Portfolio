// app/api/test-db/route.js
import pool from "@/lib/db";

export async function GET() {
  try {
    const res = await pool.query("SELECT NOW()");
    return new Response(JSON.stringify({ now: res.rows[0].now }));
  } catch (err) {
    console.error("DB Connection Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
