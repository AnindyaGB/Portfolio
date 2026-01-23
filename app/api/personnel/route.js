export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPool } from "../../CompanyDirectory/db/db";
import sql from "mssql";

const SORT_COLUMNS = {
  firstName: "p.firstName",
  lastName: "p.lastName",
  email: "p.email",
  departmentID: "p.departmentID",
  location: "l.name",
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const departmentID = searchParams.get("departmentID");
    const locationID = searchParams.get("locationID");

    const sortBy = searchParams.get("sortBy") || "lastName";
    const order =
      searchParams.get("order")?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const offset = (page - 1) * pageSize;

    const sortColumn = SORT_COLUMNS[sortBy] || SORT_COLUMNS.lastName;

    let baseQuery = `
      FROM personnel p
      LEFT JOIN department d ON p.departmentID = d.id
      LEFT JOIN location l ON d.locationID = l.id
      WHERE 1 = 1
    `;

    const pool = await getPool();
    const requestDb = pool.request();

    if (search) {
      baseQuery += `
        AND (p.firstName LIKE @search
         OR p.lastName LIKE @search)
      `;
      requestDb.input("search", sql.NVarChar, `%${search}%`);
    }

    if (departmentID) {
      baseQuery += ` AND p.departmentID = @departmentID`;
      requestDb.input("departmentID", sql.Int, departmentID);
    }

    if (locationID) {
      baseQuery += ` AND l.id = @locationID`;
      requestDb.input("locationID", sql.Int, locationID);
    }

    // Total count
    const countResult = await requestDb.query(`
      SELECT COUNT(*) AS total
      ${baseQuery}
    `);

    const total = countResult.recordset[0].total;

    // Paged data
    requestDb.input("offset", sql.Int, offset);
    requestDb.input("pageSize", sql.Int, pageSize);

    const dataResult = await requestDb.query(`
      SELECT
        p.id,
        p.firstName,
        p.lastName,
        p.jobTitle,
        p.email,
        p.departmentID,
        d.name AS department,
        l.id AS locationID,
        l.name AS location
      ${baseQuery}
      ORDER BY ${sortColumn} ${order}
      OFFSET @offset ROWS
      FETCH NEXT @pageSize ROWS ONLY
    `);

    return NextResponse.json({
      data: dataResult.recordset,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch personnel" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, departmentID } = body;

    // Validation
    if (!firstName || !lastName || !email || !departmentID) {
      return NextResponse.json(
        { error: "firstName, lastName, email, and departmentID are required" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    await pool
      .request()
      .input("firstName", sql.NVarChar, firstName)
      .input("lastName", sql.NVarChar, lastName)
      .input("email", sql.NVarChar, email)
      .input("departmentID", sql.Int, departmentID)
      .query(`
        INSERT INTO personnel (firstName, lastName, email, departmentID)
        VALUES (@firstName, @lastName, @email, @departmentID)
      `);

    return NextResponse.json({ message: "Personnel created" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create personnel" },
      { status: 500 }
    );
  }
}
