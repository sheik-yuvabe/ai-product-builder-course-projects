export function hasMissingInquiryFields(inquiryData) {
  const { listingId, fullName, email, phone, message } = inquiryData;

  return !listingId || !fullName || !email || !phone || !message;
}

export function hasMissingInquiryUpdateFields(inquiryData) {
  const { fullName, email, phone, message } = inquiryData;

  return !fullName || !email || !phone || !message;
}

export function hasMissingSignupFields(signupData) {
  const { fullName, email, password } = signupData;

  return !fullName || !email || !password;
}

export function hasMissingLoginFields(loginData) {
  const { email, password } = loginData;

  return !email || !password;
}

export function hasMissingSavedListingFields(savedListingData) {
  const { userId, listingId } = savedListingData;

  return !userId || !listingId;
}
