export function hasMissingInquiryFields(inquiryData) {
  const { listingId, fullName, email, phone, message } = inquiryData;

  return !listingId || !fullName || !email || !phone || !message;
}

export function hasMissingInquiryUpdateFields(inquiryData) {
  const { fullName, email, phone, message } = inquiryData;

  return !fullName || !email || !phone || !message;
}
