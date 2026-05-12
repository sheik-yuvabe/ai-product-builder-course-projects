import { pool } from "./pool.js";

function formatUser(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    createdAt: row.created_at,
  };
}

export async function createUser(userData) {
  const { fullName, email, passwordHash } = userData;

  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, full_name, email, created_at`,
    [fullName, email, passwordHash]
  );

  return formatUser(result.rows[0]);
}

export async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT id, full_name, email, password_hash, created_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return {
    ...formatUser(result.rows[0]),
    passwordHash: result.rows[0].password_hash,
  };
}
