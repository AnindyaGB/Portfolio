import { NextResponse } from "next/server";
import pool from "@/lib/db"; // your db.js

export async function PUT(request, { params }) {
  // params is a Promise in Next.js 13+ App Router
  const { id } = await params;

  const personnelId = Number(id);

  if (!Number.isInteger(personnelId)) {
    return NextResponse.json(
      { error: "Invalid personnel ID" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { firstname, lastname, departmentid } = body;

  if (!firstname || !lastname || !departmentid) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const result = await pool.query(
    `
    UPDATE personnel
    SET firstname = $1,
        lastname = $2,
        departmentid = $3
    WHERE id = $4
    `,
    [firstname, lastname, departmentid, personnelId]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "Personnel not found or no change" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Personnel updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const personnelId = Number(id);

  if (!Number.isInteger(personnelId)) {
    return NextResponse.json(
      { error: "Invalid personnel ID" },
      { status: 400 }
    );
  }

  const result = await pool.query(
    `DELETE FROM personnel WHERE id = $1`,
    [personnelId]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "Personnel not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
