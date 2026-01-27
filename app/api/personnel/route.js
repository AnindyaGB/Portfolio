export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const departmentID = searchParams.get("departmentid");
    const locationID = searchParams.get("locationid");

    const sortBy = searchParams.get("sortBy")?.toLowerCase() || "lastname";
    const order =
      searchParams.get("order")?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const offset = (page - 1) * pageSize;

    const SORT_COLUMNS = {
      firstname: "p.firstname",
      lastname: "p.lastname",
      email: "p.email",
      departmentid: "p.departmentid",
      location: "l.name",
    };
    const sortColumn = SORT_COLUMNS[sortBy] || SORT_COLUMNS.lastname;

    const conditions = [];
    const values = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`(p.firstname ILIKE $${values.length} OR p.lastname ILIKE $${values.length})`);
    }

    if (departmentID) {
      values.push(departmentID);
      conditions.push(`p.departmentid = $${values.length}`);
    }

    if (locationID) {
      values.push(locationID);
      conditions.push(`l.id = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    // Debug: log query and values
    console.log("VALUES:", values);
    console.log("WHERE CLAUSE:", whereClause);

    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM personnel p
      LEFT JOIN department d ON p.departmentid = d.id
      LEFT JOIN location l ON d.locationid = l.id
      ${whereClause}
      `,
      values
    );
    const total = parseInt(countResult.rows[0].total, 10);

    const dataResult = await db.query(
      `
      SELECT
        p.id,
        p.firstname,
        p.lastname,
        p.jobtitle,
        p.email,
        p.departmentid,
        d.name AS department,
        l.id AS locationid,
        l.name AS location
      FROM personnel p
      LEFT JOIN department d ON p.departmentid = d.id
      LEFT JOIN location l ON d.locationid = l.id
      ${whereClause}
      ORDER BY ${sortColumn} ${order}
      OFFSET $${values.length + 1} LIMIT $${values.length + 2}
      `,
      [...values, offset, pageSize]
    );

    return NextResponse.json({
      data: dataResult.rows,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("GET personnel error:", err); // full error
    return NextResponse.json({ error: "Failed to fetch personnel" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, departmentid } = body;

    // Validation
    if (!firstname || !lastname || !email || !departmentid) {
      return NextResponse.json(
        { error: "firstname, lastname, email, and departmentid are required" },
        { status: 400 }
      );
    }

    // Insert personnel
    await db.query(
      `
      INSERT INTO personnel (firstname, lastname, email, departmentid)
      VALUES ($1, $2, $3, $4)
      `,
      [firstname, lastname, email, departmentid]
    );

    return NextResponse.json(
      { message: "Personnel created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST personnel error:", err);
    return NextResponse.json(
      { error: "Failed to create personnel" },
      { status: 500 }
    );
  }
}
