import sql from "mssql";

const config = {
  user: "sa",                 // change if needed
  password: "yourStrong(!)Password",  // change if needed
  server: "localhost",
  database: "companydirectory",
  options: {
    encrypt: false,           // true for Azure
    trustServerCertificate: true,
  },
};

let pool;

export async function getPool() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

