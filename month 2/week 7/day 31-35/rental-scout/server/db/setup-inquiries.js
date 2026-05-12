import { readFile } from "node:fs/promises";
import { pool } from "./pool.js";

try {
  const sql = await readFile("server/db/inquiries-schema.sql", "utf8");

  await pool.query(sql);
  console.log("Inquiries table is ready.");
} catch (error) {
  console.error("Could not create inquiries table.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
