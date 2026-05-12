import { randomUUID } from "node:crypto";
import express from "express";
import cors from "cors";
import { hashPassword, verifyPassword } from "./auth.js";
import {
  createInquiryRecord,
  deleteInquiryById,
  getInquiries,
  updateInquiryById,
} from "./db/inquiries.js";
import { getListingById, getListings } from "./db/listings.js";
import {
  createSavedListing,
  deleteSavedListingById,
  findSavedListingById,
  getSavedListingsByUserId,
} from "./db/saved-listings.js";
import { createUser, findUserByEmail } from "./db/users.js";
import {
  hasMissingInquiryFields,
  hasMissingInquiryUpdateFields,
  hasMissingLoginFields,
  hasMissingSignupFields,
} from "./helpers.js";

const app = express();
const PORT = process.env.PORT || 4000;
const sessions = new Map();

function createSession(user) {
  const token = randomUUID();

  sessions.set(token, {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
  });

  return token;
}

function getCurrentUser(request) {
  const authHeader = request.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return sessions.get(token) || null;
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    message: "Rental Scout API is running",
  });
});

app.post("/api/signup", async (request, response) => {
  const { fullName, email, password } = request.body;

  if (hasMissingSignupFields(request.body)) {
    return response.status(400).json({
      message: "Please fill all signup fields.",
    });
  }

  try {
    const passwordHash = await hashPassword(password);
    const newUser = await createUser({
      fullName,
      email,
      passwordHash,
    });

    const token = createSession(newUser);

    response.status(201).json({
      message: "Signup successful.",
      token,
      user: newUser,
    });
  } catch (error) {
    if (error.code === "23505") {
      return response.status(409).json({
        message: "A user with this email already exists.",
      });
    }

    console.error(error.message);
    response.status(500).json({
      message: "Could not create user.",
    });
  }
});

app.post("/api/login", async (request, response) => {
  const { email, password } = request.body;

  if (hasMissingLoginFields(request.body)) {
    return response.status(400).json({
      message: "Please fill all login fields.",
    });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return response.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await verifyPassword(password, user.passwordHash);

    if (!passwordMatches) {
      return response.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = createSession(user);

    response.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not log in.",
    });
  }
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

app.get("/api/saved-listings", async (request, response) => {
  const currentUser = getCurrentUser(request);

  if (!currentUser) {
    return response.status(401).json({
      message: "Please log in first.",
    });
  }

  try {
    const savedListings = await getSavedListingsByUserId(currentUser.id);
    response.json(savedListings);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not load saved listings.",
    });
  }
});

app.post("/api/saved-listings", async (request, response) => {
  const currentUser = getCurrentUser(request);
  const { listingId } = request.body;

  if (!currentUser) {
    return response.status(401).json({
      message: "Please log in first.",
    });
  }

  if (!listingId) {
    return response.status(400).json({
      message: "Listing ID is required.",
    });
  }

  try {
    const savedListing = await createSavedListing(currentUser.id, listingId);

    response.status(201).json({
      message: "Listing saved.",
      savedListing,
    });
  } catch (error) {
    if (error.code === "23505") {
      return response.status(409).json({
        message: "This listing is already saved.",
      });
    }

    console.error(error.message);
    response.status(500).json({
      message: "Could not save listing.",
    });
  }
});

app.delete("/api/saved-listings/:id", async (request, response) => {
  const currentUser = getCurrentUser(request);

  if (!currentUser) {
    return response.status(401).json({
      message: "Please log in first.",
    });
  }

  try {
    const existingSavedListing = await findSavedListingById(request.params.id);

    if (!existingSavedListing) {
      return response.status(404).json({
        message: "Saved listing not found.",
      });
    }

    if (existingSavedListing.user_id !== currentUser.id) {
      return response.status(403).json({
        message: "You cannot remove another user's saved listing.",
      });
    }

    const deletedSavedListing = await deleteSavedListingById(
      request.params.id,
      currentUser.id,
    );

    response.json({
      message: "Saved listing removed.",
      savedListing: deletedSavedListing,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({
      message: "Could not remove saved listing.",
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











