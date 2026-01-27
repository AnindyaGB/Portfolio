import pkg from "pg";
const { Pool } = pkg;

// Detect if we're using Neon (or any remote SSL-required DB)
const isProduction = process.env.DATABASE_URL?.includes("neon");

export const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Neon requires SSL
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
      }
);

export default {
  query: (text, params) => pool.query(text, params),
};
