import express from "express";
import cors from "cors";
import {
  createInquiryRecord,
  deleteInquiryById,
  getInquiries,
  updateInquiryById,
} from "./db/inquiries.js";
import { getListingById, getListings } from "./db/listings.js";
import {
  hasMissingInquiryFields,
  hasMissingInquiryUpdateFields,
} from "./helpers.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    message: "Rental Scout API is running",
  });
});

app.get("/api/listings", async (request, response) => {
  try {
    const databaseListings = await getListings();
    response.json(databaseListings);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not load listings from the database.",
    });
  }
});

app.get("/api/listings/:id", async (request, response) => {
  try {
    const selectedListing = await getListingById(request.params.id);

    if (!selectedListing) {
      return response.status(404).json({
        message: "Listing not found",
      });
    }

    response.json(selectedListing);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not load the listing from the database.",
    });
  }
});

app.get("/api/inquiries", async (request, response) => {
  try {
    const databaseInquiries = await getInquiries();
    response.json(databaseInquiries);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not load inquiries from the database.",
    });
  }
});

app.post("/api/inquiries", async (request, response) => {
  const { listingId, fullName, email, phone, message } = request.body;

  if (hasMissingInquiryFields(request.body)) {
    return response.status(400).json({
      message: "Please fill all inquiry fields.",
    });
  }

  try {
    const selectedListing = await getListingById(listingId);

    if (!selectedListing) {
      return response.status(404).json({
        message: "Listing not found.",
      });
    }

    const newInquiry = await createInquiryRecord({
      listingId: selectedListing.id,
      fullName,
      email,
      phone,
      message,
    });

    response.status(201).json({
      message: "Inquiry received.",
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not save inquiry to the database.",
    });
  }
});

app.delete("/api/inquiries/:id", async (request, response) => {
  try {
    const deletedInquiry = await deleteInquiryById(request.params.id);

    if (!deletedInquiry) {
      return response.status(404).json({
        message: "Inquiry not found.",
      });
    }

    response.json({
      message: "Inquiry deleted.",
      inquiry: deletedInquiry,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not delete inquiry from the database.",
    });
  }
});

app.patch("/api/inquiries/:id", async (request, response) => {
  const { fullName, email, phone, message } = request.body;

  if (hasMissingInquiryUpdateFields(request.body)) {
    return response.status(400).json({
      message: "Please fill all editable inquiry fields.",
    });
  }

  try {
    const updatedInquiry = await updateInquiryById(request.params.id, {
      fullName,
      email,
      phone,
      message,
    });

    if (!updatedInquiry) {
      return response.status(404).json({
        message: "Inquiry not found.",
      });
    }

    response.json({
      message: "Inquiry updated.",
      inquiry: updatedInquiry,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not update inquiry in the database.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Rental Scout API is running on http://localhost:${PORT}`);
});
