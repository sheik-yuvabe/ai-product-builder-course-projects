import { pool } from "./pool.js";

function formatListing(row) {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    rent: `Rs. ${row.rent_amount.toLocaleString("en-IN")} / month`,
    bedrooms: row.bedrooms === 1 ? "1 bed" : `${row.bedrooms} beds`,
    badge: row.badge,
  };
}

export async function getListings() {
  const result = await pool.query(
    "SELECT id, title, location, rent_amount, bedrooms, badge FROM listings ORDER BY id"
  );

  return result.rows.map(formatListing);
}

export async function getListingById(id) {
  const result = await pool.query(
    "SELECT id, title, location, rent_amount, bedrooms, badge FROM listings WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return formatListing(result.rows[0]);
}
