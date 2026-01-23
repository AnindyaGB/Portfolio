import { NextResponse } from "next/server";
import { getPool } from "../../../CompanyDirectory/db/db";
import sql from "mssql";

export async function PUT(request, context) {
  try {
    // ✅ Next.js 15: params is async
    const params = await context.params;
    const id = Number(params.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Invalid location ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Location name is required" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 🔒 Enforce unique location name (excluding self)
    const duplicateCheck = await pool
      .request()
      .input("name", sql.NVarChar(50), name)
      .input("id", sql.Int, id)
      .query(`
        SELECT COUNT(*) AS count
        FROM dbo.location
        WHERE name = @name AND id <> @id
      `);

    if (duplicateCheck.recordset[0].count > 0) {
      return NextResponse.json(
        { error: "Location name already exists" },
        { status: 409 }
      );
    }

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar(50), name)
      .query(`
        UPDATE dbo.location
        SET name = @name
        WHERE id = @id
      `);

    console.log("Locations updated:", result.rowsAffected);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Location not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Location updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT location error:", err);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    // ✅ Next.js 15: params is async
    const params = await context.params;
    const id = Number(params.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Invalid location ID" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 🔒 BLOCK DELETE IF LOCATION HAS DEPARTMENTS
    const deptCheck = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT COUNT(*) AS departmentCount
        FROM dbo.department
        WHERE locationID = @id
      `);

    if (deptCheck.recordset[0].departmentCount > 0) {
      return NextResponse.json(
        {
          error: "Location contains departments and cannot be deleted",
        },
        { status: 409 } // Conflict
      );
    }

    // 🗑 Safe to delete
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM dbo.location
        WHERE id = @id
      `);

    console.log("Locations deleted:", result.rowsAffected);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Location deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE location error:", err);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 }
    );
  }
}
