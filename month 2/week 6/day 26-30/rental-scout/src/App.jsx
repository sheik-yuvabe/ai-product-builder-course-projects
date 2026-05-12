import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, NavLink, Link, useParams } from "react-router";

function BrowsePage({
  listings,
  onSaveListing,
  savedListings,
  isLoading,
  errorMessage,
}) {
  return (
    <main className="app-shell">
      <Navigation />

      <section className="hero-banner">
        <p className="eyebrow">Rental Scout</p>
        <h1>Find apartments that match your budget and area.</h1>
        <p className="hero-copy">
          Start with a simple browse screen. Later, we can add routing, saved
          listings, and inquiry forms.
        </p>
      </section>

      <section className="listings-section">
        <div className="section-heading">
          <h2>Featured listings</h2>
          <p>Three sample apartments to help us build the first version.</p>
        </div>

        {isLoading && <p className="empty-state">Loading listings...</p>}

        {errorMessage && <p className="empty-state">{errorMessage}</p>}

        {!isLoading && !errorMessage && (
          <div className="listing-grid">
            {listings.map((listing) => (
              <article className="listing-card" key={listing.id}>
                <p className="listing-badge">{listing.badge}</p>
                <h3>{listing.title}</h3>
                <p className="listing-location">{listing.location}</p>
                <div className="listing-meta">
                  <span>{listing.rent}</span>
                  <span>{listing.bedrooms}</span>
                </div>
                <div className="listing-actions">
                  <button
                    className="save-button"
                    type="button"
                    onClick={() => onSaveListing(listing)}
                    disabled={savedListings.some(
                      (savedListing) => savedListing.id === listing.id,
                    )}
                  >
                    {savedListings.some(
                      (savedListing) => savedListing.id === listing.id,
                    )
                      ? "Saved"
                      : "Save listing"}
                  </button>
                  <Link className="details-link" to={`/listings/${listing.id}`}>
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function SavedPage({ savedListings }) {
  return (
    <main className="app-shell">
      <Navigation />
      <section className="hero-banner">
        <p className="eyebrow">Saved Listings</p>
        <h1>Your shortlist</h1>
        <p className="hero-copy">
          Review the apartments you want to compare later.
        </p>
      </section>

      <section className="listings-section">
        {savedListings.length === 0 ? (
          <p className="empty-state">
            You have not saved any listings yet. Go back to Browse and save one
            apartment.
          </p>
        ) : (
          <div className="listing-grid">
            {savedListings.map((listing) => (
              <article className="listing-card" key={listing.id}>
                <p className="listing-badge">{listing.badge}</p>
                <h3>{listing.title}</h3>
                <p className="listing-location">{listing.location}</p>
                <div className="listing-meta">
                  <span>{listing.rent}</span>
                  <span>{listing.bedrooms}</span>
                </div>
                <div className="listing-actions">
                  <Link className="details-link" to={`/listings/${listing.id}`}>
                    View details
                  </Link>
                  <Link className="details-link" to={`/inquiry/${listing.id}`}>
                    Inquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Navigation() {
  return (
    <nav>
      <NavLink to="/">Browse</NavLink>
      <NavLink to="/saved">Saved</NavLink>
      <NavLink to="/inquiries">Inquiries</NavLink>
    </nav>
  );
}

function ListingDetailsPage() {
  const { id } = useParams();
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadListingDetails() {
      try {
        const response = await fetch(`http://localhost:4000/api/listings/${id}`);

        if (!response.ok) {
          throw new Error("Listing not found.");
        }

        const data = await response.json();
        setSelectedListing(data);
      } catch {
        setErrorMessage("Listing not found.");
      } finally {
        setIsLoading(false);
      }
    }

    loadListingDetails();
  }, [id]);

  if (isLoading) {
    return (
      <main className="app-shell">
        <Navigation />
        <p className="empty-state">Loading listing details...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="app-shell">
        <Navigation />
        <p className="empty-state">{errorMessage}</p>
        <Link className="details-link" to="/">
          Back to browse
        </Link>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Navigation />
      <section className="hero-banner">
        <p className="eyebrow">Listing Details</p>
        <h1>{selectedListing.title}</h1>
        <p className="hero-copy">{selectedListing.location}</p>
      </section>

      <section className="listings-section">
        <div className="listing-card">
          <p className="listing-badge">{selectedListing.badge}</p>
          <p className="listing-location">{selectedListing.rent}</p>
          <div className="listing-meta">
            <span>{selectedListing.location}</span>
            <span>{selectedListing.bedrooms}</span>
          </div>
          <p className="details-note">
            This details page is now loaded from the Express backend.
          </p>
          <div className="listing-actions">
            <Link className="details-link" to={`/inquiry/${selectedListing.id}`}>
              Inquire now
            </Link>
            <Link className="details-link secondary-link" to="/saved">
              View saved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function InquiryPage() {
  const { id } = useParams();
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function loadInquiryListing() {
      try {
        const response = await fetch(`http://localhost:4000/api/listings/${id}`);

        if (!response.ok) {
          throw new Error("Listing not found.");
        }

        const data = await response.json();
        setSelectedListing(data);
      } catch {
        setErrorMessage("Listing not found.");
      } finally {
        setIsLoading(false);
      }
    }

    loadInquiryListing();
  }, [id]);

  if (isLoading) {
    return (
      <main className="app-shell">
        <Navigation />
        <p className="empty-state">Loading inquiry details...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="app-shell">
        <Navigation />
        <section className="hero-banner">
          <p className="eyebrow">Inquiry</p>
          <h1>Listing not found</h1>
          <p className="hero-copy">
            This inquiry link does not match a listing in the backend.
          </p>
        </section>
      </main>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("http://localhost:4000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: selectedListing.id,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not submit inquiry.");
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError("Could not submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="app-shell">
      <Navigation />

      <section className="hero-banner">
        <p className="eyebrow">Inquiry</p>
        <h1>Contact owner for {selectedListing.title}</h1>
        <p className="hero-copy">
          Fill in this simple form to show interest in the listing.
        </p>
      </section>

      {isSubmitted ? (
        <section className="confirmation-card">
          <p className="listing-badge">Inquiry sent</p>
          <h2>Thanks, {formData.fullName}.</h2>
          <p className="hero-copy">
            Your inquiry for {selectedListing.title} has been recorded. In a
            real app, this is where a backend would send the message to the
            owner or agent.
          </p>
          <div className="listing-actions">
            <Link className="details-link" to="/saved">
              Go to saved listings
            </Link>
            <Link className="details-link secondary-link" to="/">
              Back to browse
            </Link>
          </div>
        </section>
      ) : (
        <section className="form-card">
          <div className="listing-card inquiry-summary">
            <p className="listing-badge">{selectedListing.badge}</p>
            <h3>{selectedListing.title}</h3>
            <p className="listing-location">{selectedListing.location}</p>
            <div className="listing-meta">
              <span>{selectedListing.rent}</span>
              <span>{selectedListing.bedrooms}</span>
            </div>
          </div>

          <form className="inquiry-form" onSubmit={handleSubmit}>
            <label className="form-field">
              Full name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>

            <label className="form-field">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </label>

            <label className="form-field">
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </label>

            <label className="form-field">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi, I would like to know if this apartment is still available."
                rows="5"
                required
              />
            </label>

            <button
              className="save-button form-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit inquiry"}
            </button>

            {submitError && <p className="empty-state">{submitError}</p>}
          </form>
        </section>
      )}
    </main>
  );
}

function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingInquiryId, setDeletingInquiryId] = useState(null);
  const [editingInquiryId, setEditingInquiryId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [editError, setEditError] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  useEffect(() => {
    async function loadInquiries() {
      try {
        const response = await fetch("http://localhost:4000/api/inquiries");

        if (!response.ok) {
          throw new Error("Could not load inquiries.");
        }

        const data = await response.json();
        setInquiries(data);
      } catch {
        setErrorMessage("Could not connect to the inquiries API.");
      } finally {
        setIsLoading(false);
      }
    }

    loadInquiries();
  }, []);

  async function handleDeleteInquiry(id) {
    setDeleteError("");
    setDeletingInquiryId(id);

    try {
      const response = await fetch(`http://localhost:4000/api/inquiries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete inquiry.");
      }

      setInquiries((currentInquiries) =>
        currentInquiries.filter((inquiry) => inquiry.id !== id),
      );
    } catch {
      setDeleteError("Could not delete inquiry. Please try again.");
    } finally {
      setDeletingInquiryId(null);
    }
  }

  function startEditingInquiry(inquiry) {
    setEditError("");
    setEditingInquiryId(inquiry.id);
    setEditFormData({
      fullName: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
    });
  }

  function cancelEditingInquiry() {
    setEditingInquiryId(null);
    setEditError("");
    setEditFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleEditSubmit(event, id) {
    event.preventDefault();
    setEditError("");
    setIsSavingEdit(true);

    try {
      const response = await fetch(`http://localhost:4000/api/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error("Could not update inquiry.");
      }

      const data = await response.json();

      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === id ? data.inquiry : inquiry,
        ),
      );
      cancelEditingInquiry();
    } catch {
      setEditError("Could not update inquiry. Please try again.");
    } finally {
      setIsSavingEdit(false);
    }
  }

  return (
    <main className="app-shell">
      <Navigation />

      <section className="hero-banner">
        <p className="eyebrow">Inquiry Manager</p>
        <h1>Review saved inquiries</h1>
        <p className="hero-copy">
          These records are loaded from the PostgreSQL inquiries table.
        </p>
      </section>

      <section className="listings-section">
        <div className="section-heading">
          <h2>Inquiry records</h2>
          <p>Check the messages submitted from the inquiry form.</p>
        </div>

        {isLoading && <p className="empty-state">Loading inquiries...</p>}

        {errorMessage && <p className="empty-state">{errorMessage}</p>}

        {deleteError && <p className="empty-state">{deleteError}</p>}

        {editError && <p className="empty-state">{editError}</p>}

        {!isLoading && !errorMessage && inquiries.length === 0 && (
          <p className="empty-state">No inquiries have been submitted yet.</p>
        )}

        {!isLoading && !errorMessage && inquiries.length > 0 && (
          <div className="inquiry-list">
            {inquiries.map((inquiry) => (
              <article className="listing-card inquiry-record" key={inquiry.id}>
                {editingInquiryId === inquiry.id ? (
                  <form
                    className="inquiry-form compact-form"
                    onSubmit={(event) => handleEditSubmit(event, inquiry.id)}
                  >
                    <label className="form-field">
                      Full name
                      <input
                        type="text"
                        name="fullName"
                        value={editFormData.fullName}
                        onChange={handleEditChange}
                        required
                      />
                    </label>

                    <label className="form-field">
                      Email
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        required
                      />
                    </label>

                    <label className="form-field">
                      Phone
                      <input
                        type="tel"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleEditChange}
                        required
                      />
                    </label>

                    <label className="form-field">
                      Message
                      <textarea
                        name="message"
                        value={editFormData.message}
                        onChange={handleEditChange}
                        rows="4"
                        required
                      />
                    </label>

                    <div className="listing-actions">
                      <button
                        className="save-button"
                        type="submit"
                        disabled={isSavingEdit}
                      >
                        {isSavingEdit ? "Saving..." : "Save changes"}
                      </button>
                      <button
                        className="details-link button-link"
                        type="button"
                        onClick={cancelEditingInquiry}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="inquiry-record-heading">
                      <div>
                        <p className="listing-badge">
                          Listing #{inquiry.listingId}
                        </p>
                        <h3>{inquiry.fullName}</h3>
                      </div>
                      <span className="record-id">#{inquiry.id}</span>
                    </div>
                    <p className="listing-location">{inquiry.message}</p>
                    <div className="inquiry-contact">
                      <span>{inquiry.email}</span>
                      <span>{inquiry.phone}</span>
                    </div>
                    <div className="listing-actions">
                      <button
                        className="save-button"
                        type="button"
                        onClick={() => startEditingInquiry(inquiry)}
                      >
                        Edit inquiry
                      </button>
                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        disabled={deletingInquiryId === inquiry.id}
                      >
                        {deletingInquiryId === inquiry.id
                          ? "Deleting..."
                          : "Delete inquiry"}
                      </button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function App() {
  const [apiListings, setApiListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadListings() {
      try {
        const response = await fetch("http://localhost:4000/api/listings");

        if (!response.ok) {
          throw new Error("Could not load listings.");
        }

        const data = await response.json();
        setApiListings(data);
      } catch {
        setErrorMessage("Could not connect to the listings API.");
      } finally {
        setIsLoading(false);
      }
    }

    loadListings();
  }, []);

  function handleSaveListing(listing) {
    setSavedListings((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (savedListing) => savedListing.id === listing.id,
      );

      if (alreadySaved) {
        return currentSaved;
      }

      return [...currentSaved, listing];
    });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BrowsePage
            listings={apiListings}
            onSaveListing={handleSaveListing}
            savedListings={savedListings}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        }
      />

      <Route
        path="/saved"
        element={<SavedPage savedListings={savedListings} />}
      />

      <Route path="/listings/:id" element={<ListingDetailsPage />} />
      <Route path="/inquiry/:id" element={<InquiryPage />} />
      <Route path="/inquiries" element={<InquiriesPage />} />
    </Routes>
  );
}

export default App;
