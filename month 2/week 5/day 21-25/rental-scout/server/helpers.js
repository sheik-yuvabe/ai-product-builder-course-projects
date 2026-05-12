export function findListingById(listings, id) {
  return listings.find((listing) => listing.id === Number(id));
}

export function hasMissingInquiryFields(inquiryData) {
  const { listingId, fullName, email, phone, message } = inquiryData;

  return !listingId || !fullName || !email || !phone || !message;
}

export function createInquiry(inquiries, listingId, formData) {
  const { fullName, email, phone, message } = formData;

  return {
    id: inquiries.length + 1,
    listingId: Number(listingId),
    fullName,
    email,
    phone,
    message,
  };
}
