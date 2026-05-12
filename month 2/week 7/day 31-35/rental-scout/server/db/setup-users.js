import { readFile } from "node:fs/promises";
import { pool } from "./pool.js";

try {
  const sql = await readFile("server/db/users-schema.sql", "utf8");

  await pool.query(sql);
  console.log("Users table is ready.");
} catch (error) {
  console.error("Could not create users table.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
