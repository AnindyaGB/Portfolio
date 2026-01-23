import { NextResponse } from "next/server";
import { getPool } from "../../CompanyDirectory/db/db";
import sql from "mssql";

export async function GET() {
  try {
    const pool = await getPool();

  const result = await pool.query(`
    SELECT
      d.id AS value,
      d.name AS label,
      d.locationID,
      l.name AS locationName
    FROM dbo.department d
    JOIN dbo.location l ON d.locationID = l.id
    ORDER BY d.name
  `);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, locationID } = await request.json();

    if (!name || !locationID) {
      return NextResponse.json(
        { error: "Department name and location are required" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // Check uniqueness
    const existing = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .query(`
        SELECT 1
        FROM department
        WHERE name = @name
      `);

    if (existing.recordset.length > 0) {
      return NextResponse.json(
        { error: "Department name already exists" },
        { status: 409 }
      );
    }

    // Insert
    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("locationID", sql.Int, locationID)
      .query(`
        INSERT INTO department (name, locationID)
        VALUES (@name, @locationID)
      `);

    return NextResponse.json(
      { message: "Department created" },
      { status: 201 }
    );
  } catch (err) {
    // Handle unique index violation (race condition safety)
    if (err.number === 2601 || err.number === 2627) {
      return NextResponse.json(
        { error: "Department name already exists" },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: "Failed to create department" },
      { status: 500 }
    );
  }
}
