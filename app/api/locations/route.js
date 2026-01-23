import { NextResponse } from "next/server";
import { getPool } from "../../CompanyDirectory/db/db";
import sql from "mssql";

export async function GET() {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT id as value, name as label
      FROM location
      ORDER BY name
    `);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error(err);
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

    const pool = await getPool();

    // Check uniqueness (friendly error)
    const existing = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .query(`
        SELECT 1
        FROM location
        WHERE name = @name
      `);

    if (existing.recordset.length > 0) {
      return NextResponse.json(
        { error: "Location already exists" },
        { status: 409 }
      );
    }

    // Insert + return ID
    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .query(`
        INSERT INTO location (name)
        OUTPUT INSERTED.id
        VALUES (@name)
      `);

    return NextResponse.json(
      { id: result.recordset[0].id },
      { status: 201 }
    );
  } catch (err) {
    // Catch race-condition duplicate
    if (err.number === 2601 || err.number === 2627) {
      return NextResponse.json(
        { error: "Location already exists" },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
