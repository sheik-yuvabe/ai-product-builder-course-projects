import { pool } from "./pool.js";

function formatSavedListing(row) {
  return {
    id: row.id,
    userId: row.user_id,
    listingId: row.listing_id,
    title: row.title,
    location: row.location,
    rent: `Rs. ${row.rent_amount.toLocaleString("en-IN")} / month`,
    bedrooms: row.bedrooms === 1 ? "1 bed" : `${row.bedrooms} beds`,
    badge: row.badge,
    createdAt: row.created_at,
  };
}

export async function getSavedListingsByUserId(userId) {
  const result = await pool.query(
    `SELECT saved_listings.id,
            saved_listings.user_id,
            saved_listings.listing_id,
            saved_listings.created_at,
            listings.title,
            listings.location,
            listings.rent_amount,
            listings.bedrooms,
            listings.badge
     FROM saved_listings
     JOIN listings ON listings.id = saved_listings.listing_id
     WHERE saved_listings.user_id = $1
     ORDER BY saved_listings.id`,
    [userId]
  );

  return result.rows.map(formatSavedListing);
}

export async function createSavedListing(userId, listingId) {
  const result = await pool.query(
    `INSERT INTO saved_listings (user_id, listing_id)
     VALUES ($1, $2)
     RETURNING id`,
    [userId, listingId]
  );

  const savedListings = await getSavedListingsByUserId(userId);

  return savedListings.find(
    (savedListing) => savedListing.id === result.rows[0].id
  );
}

export async function findSavedListingById(id) {
  const result = await pool.query(
    `SELECT id, user_id, listing_id, created_at
     FROM saved_listings
     WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

export async function deleteSavedListingById(id, userId) {
  const result = await pool.query(
    `DELETE FROM saved_listings
     WHERE id = $1 AND user_id = $2
     RETURNING id, user_id, listing_id, created_at`,
    [id, userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
