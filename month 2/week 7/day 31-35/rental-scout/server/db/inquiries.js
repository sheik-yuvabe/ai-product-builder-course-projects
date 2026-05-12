import { pool } from "./pool.js";

function formatInquiry(row) {
  return {
    id: row.id,
    listingId: row.listing_id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    createdAt: row.created_at,
  };
}

export async function getInquiries() {
  const result = await pool.query(
    "SELECT id, listing_id, full_name, email, phone, message, created_at FROM inquiries ORDER BY id"
  );

  return result.rows.map(formatInquiry);
}

export async function createInquiryRecord(inquiryData) {
  const { listingId, fullName, email, phone, message } = inquiryData;

  const result = await pool.query(
    `INSERT INTO inquiries (listing_id, full_name, email, phone, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, listing_id, full_name, email, phone, message, created_at`,
    [listingId, fullName, email, phone, message]
  );

  return formatInquiry(result.rows[0]);
}

export async function deleteInquiryById(id) {
  const result = await pool.query(
    `DELETE FROM inquiries
     WHERE id = $1
     RETURNING id, listing_id, full_name, email, phone, message, created_at`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return formatInquiry(result.rows[0]);
}

export async function updateInquiryById(id, inquiryData) {
  const { fullName, email, phone, message } = inquiryData;

  const result = await pool.query(
    `UPDATE inquiries
     SET full_name = $1,
         email = $2,
         phone = $3,
         message = $4
     WHERE id = $5
     RETURNING id, listing_id, full_name, email, phone, message, created_at`,
    [fullName, email, phone, message, id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return formatInquiry(result.rows[0]);
}
