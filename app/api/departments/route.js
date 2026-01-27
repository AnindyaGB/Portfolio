import { NextResponse } from "next/server";
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        d.id AS value,
        d.name AS label,
        d.locationid,
        l.name AS locationname
      FROM department d
      JOIN location l ON d.locationid = l.id
      ORDER BY d.name
    `);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("GET departments error:", err);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, locationid } = await request.json();

    // Validate input
    if (!name || !locationid) {
      return NextResponse.json(
        { error: "Department name and location are required" },
        { status: 400 }
      );
    }

    // Check uniqueness
    const existing = await pool.query(
      `SELECT 1 FROM department WHERE name = $1`,
      [name]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Department name already exists" },
        { status: 409 }
      );
    }

    // Insert new department
    await pool.query(
      `
      INSERT INTO department (name, locationid)
      VALUES ($1, $2)
      `,
      [name, locationid]
    );

    return NextResponse.json(
      { message: "Department created" },
      { status: 201 }
    );
  } catch (err) {
    // PostgreSQL unique constraint error code: 23505
    if (err.code === '23505') {
      return NextResponse.json(
        { error: "Department name already exists" },
        { status: 409 }
      );
    }

    console.error("POST departments error:", err);
    return NextResponse.json(
      { error: "Failed to create department" },
      { status: 500 }
    );
  }
}
