import { pool } from "./pool.js";

if (!process.env.PGPASSWORD) {
  console.error("Database connection failed.");
  console.error("PGPASSWORD is not set in this terminal.");
  process.exit(1);
}

try {
  const result = await pool.query(
    "SELECT current_database() AS database_name, current_user AS user_name, COUNT(*) AS listing_count FROM listings"
  );

  console.log("Database connected successfully.");
  console.log(result.rows[0]);
} catch (error) {
  console.error("Database connection failed.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
