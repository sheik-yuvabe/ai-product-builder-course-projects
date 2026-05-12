import { readFile } from "node:fs/promises";
import { pool } from "./pool.js";

try {
  const sql = await readFile("server/db/saved-listings-schema.sql", "utf8");

  await pool.query(sql);
  console.log("Saved listings table is ready.");
} catch (error) {
  console.error("Could not create saved listings table.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
