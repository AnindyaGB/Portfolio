import { NextResponse } from "next/server";
import { getPool } from "../../../CompanyDirectory/db/db";
import sql from "mssql";

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Invalid personnel ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, departmentID } = body;

    if (!firstName || !lastName || !departmentID) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("firstName", sql.NVarChar(50), firstName)
      .input("lastName", sql.NVarChar(50), lastName)
      .input("departmentID", sql.Int, departmentID)
      .query(`
        UPDATE dbo.personnel
        SET
          firstName = @firstName,
          lastName = @lastName,
          departmentID = @departmentID
        WHERE id = @id
      `);

    console.log("Rows updated:", result.rowsAffected);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Personnel not found or no change" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Personnel updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT personnel error:", err);
    return NextResponse.json(
      { error: "Failed to update personnel" },
      { status: 500 }
    );
  }
}



export async function DELETE(request, context) {
  const params = await context.params; // ✅ REQUIRED IN NEXT 15
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    return NextResponse.json(
      { error: "Invalid personnel ID" },
      { status: 400 }
    );
  }

  const pool = await getPool();

  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(`
      DELETE FROM dbo.personnel
      WHERE id = @id
    `);

  console.log("Rows deleted:", result.rowsAffected);

  if (result.rowsAffected[0] === 0) {
    return NextResponse.json(
      { error: "Personnel not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}

