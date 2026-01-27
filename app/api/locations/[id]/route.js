import { NextResponse } from "next/server";
import {pool} from "@/lib/db";

// ======================
// UPDATE LOCATION
// ======================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const locationId = Number(id);

    if (!Number.isInteger(locationId)) {
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

    // Check duplicate name (excluding self)
    const duplicateCheck = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM location
      WHERE name = $1 AND id <> $2
      `,
      [name, locationId]
    );

    if (Number(duplicateCheck.rows[0].count) > 0) {
      return NextResponse.json(
        { error: "Location name already exists" },
        { status: 409 }
      );
    }

    // Update location
    const result = await pool.query(
      `
      UPDATE location
      SET name = $1
      WHERE id = $2
      `,
      [name, locationId]
    );

    if (result.rowCount === 0) {
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

// ======================
// DELETE LOCATION
// ======================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const locationId = Number(id);

    if (!Number.isInteger(locationId)) {
      return NextResponse.json(
        { error: "Invalid location ID" },
        { status: 400 }
      );
    }

    // Block delete if departments exist
    const deptCheck = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM department
      WHERE locationid = $1
      `,
      [locationId]
    );

    if (Number(deptCheck.rows[0].count) > 0) {
      return NextResponse.json(
        { error: "Location contains departments and cannot be deleted" },
        { status: 409 }
      );
    }

    // Delete location
    const result = await pool.query(
      `
      DELETE FROM location
      WHERE id = $1
      `,
      [locationId]
    );

    if (result.rowCount === 0) {
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
