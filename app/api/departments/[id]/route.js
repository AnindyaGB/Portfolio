import { NextResponse } from "next/server";
import { pool } from "@/lib/db"; // your db.js

// ====================
// UPDATE DEPARTMENT
// ====================
export async function PUT(request, { params }) {
  try {
    // Next.js 13+: params is a promise
    const { id } = await params;
    const departmentId = Number(id);

    if (!Number.isInteger(departmentId)) {
      return NextResponse.json(
        { error: "Invalid department ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, locationid } = body;

    if (!name || !locationid) {
      return NextResponse.json(
        { error: "Department name and location are required" },
        { status: 400 }
      );
    }

    // Check for duplicate name (excluding this department)
    const duplicateCheck = await pool.query(
      `SELECT COUNT(*) AS count
       FROM department
       WHERE name = $1 AND id <> $2`,
      [name, departmentId]
    );

    if (Number(duplicateCheck.rows[0].count) > 0) {
      return NextResponse.json(
        { error: "Department name already exists" },
        { status: 409 }
      );
    }

    // Update department
    const result = await pool.query(
      `UPDATE department
       SET name = $1,
           locationid = $2
       WHERE id = $3`,
      [name, locationid, departmentId]
    );

    if (result.rowCount === 0) {
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

// ====================
// DELETE DEPARTMENT
// ====================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const departmentId = Number(id);

    if (!Number.isInteger(departmentId)) {
      return NextResponse.json(
        { error: "Invalid department ID" },
        { status: 400 }
      );
    }

    // Check if any personnel are assigned to this department
    const check = await pool.query(
      `SELECT COUNT(*) AS count
       FROM personnel
       WHERE departmentid = $1`,
      [departmentId]
    );

    if (Number(check.rows[0].count) > 0) {
      return NextResponse.json(
        { error: "Department is assigned to personnel and cannot be deleted" },
        { status: 409 } // Conflict
      );
    }

    // Delete department
    const result = await pool.query(
      `DELETE FROM department WHERE id = $1`,
      [departmentId]
    );

    if (result.rowCount === 0) {
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
