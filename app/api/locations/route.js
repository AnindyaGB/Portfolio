import { NextResponse } from "next/server";
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id AS value, name AS label
      FROM location
      ORDER BY name
    `);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("GET locations error:", err);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Location name is required" },
        { status: 400 }
      );
    }

    const existing = await pool.query(
      `SELECT 1 FROM location WHERE name = $1`,
      [name]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Location already exists" },
        { status: 409 }
      );
    }

    const insertResult = await pool.query(
      `
      INSERT INTO location (name)
      VALUES ($1)
      RETURNING id
      `,
      [name]
    );

    return NextResponse.json(
      { id: insertResult.rows[0].id },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === '23505') {
      return NextResponse.json(
        { error: "Location already exists" },
        { status: 409 }
      );
    }

    console.error("POST locations error:", err);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
