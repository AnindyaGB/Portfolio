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
        { error: "Invalid department ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, locationID } = body;

    if (!name || !locationID) {
      return NextResponse.json(
        { error: "Department name and location are required" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 🔒 Enforce unique department name (excluding self)
    const duplicateCheck = await pool
      .request()
      .input("name", sql.NVarChar(50), name)
      .input("id", sql.Int, id)
      .query(`
        SELECT COUNT(*) AS count
        FROM dbo.department
        WHERE name = @name AND id <> @id
      `);

    if (duplicateCheck.recordset[0].count > 0) {
      return NextResponse.json(
        { error: "Department name already exists" },
        { status: 409 }
      );
    }

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar(50), name)
      .input("locationID", sql.Int, locationID)
      .query(`
        UPDATE dbo.department
        SET
          name = @name,
          locationID = @locationID
        WHERE id = @id
      `);

    console.log("Departments updated:", result.rowsAffected);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Department not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Department updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT department error:", err);
    return NextResponse.json(
      { error: "Failed to update department" },
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
        { error: "Invalid department ID" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // 🔍 Check if department is in use
    const check = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT COUNT(*) AS count
        FROM dbo.personnel
        WHERE departmentID = @id
      `);

    if (check.recordset[0].count > 0) {
      return NextResponse.json(
        { error: "Department is assigned to personnel and cannot be deleted" },
        { status: 409 } // Conflict
      );
    }

    // 🗑 Delete department
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM dbo.department
        WHERE id = @id
      `);

    console.log("Departments deleted:", result.rowsAffected);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Department deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE department error:", err);
    return NextResponse.json(
      { error: "Failed to delete department" },
      { status: 500 }
    );
  }
}
