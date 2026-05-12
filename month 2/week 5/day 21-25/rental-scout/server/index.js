import express from "express";
import cors from "cors";
import { inquiries, listings } from "./data.js";
import {
  createInquiry,
  findListingById,
  hasMissingInquiryFields,
} from "./helpers.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    message: "Rental Scout API is running",
  });
});

app.get("/api/listings", (request, response) => {
  response.json(listings);
});

app.get("/api/listings/:id", (request, response) => {
  const selectedListing = findListingById(listings, request.params.id);

  if (!selectedListing) {
    return response.status(404).json({
      message: "Listing not found",
    });
  }

  response.json(selectedListing);
});

app.get("/api/inquiries", (request, response) => {
  response.json(inquiries);
});

app.post("/api/inquiries", (request, response) => {
  const { listingId, fullName, email, phone, message } = request.body;

  if (hasMissingInquiryFields(request.body)) {
    return response.status(400).json({
      message: "Please fill all inquiry fields.",
    });
  }

  const selectedListing = findListingById(listings, listingId);

  if (!selectedListing) {
    return response.status(404).json({
      message: "Listing not found.",
    });
  }

  const newInquiry = createInquiry(inquiries, selectedListing.id, {
    fullName,
    email,
    phone,
    message,
  });

  inquiries.push(newInquiry);

  response.status(201).json({
    message: "Inquiry received.",
    inquiry: newInquiry,
  });
});

app.listen(PORT, () => {
  console.log(`Rental Scout API is running on http://localhost:${PORT}`);
});
