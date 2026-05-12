import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, NavLink, Link, useParams } from "react-router";

function BrowsePage({
  currentUser,
  listings,
  onSaveListing,
  savedListings,
  isLoading,
  errorMessage,
  saveErrorMessage,
  onLogout,
}) {
  return (
    <main className="app-shell">
      <Navigation currentUser={currentUser} onLogout={onLogout} />

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

        {saveErrorMessage && <p className="empty-state">{saveErrorMessage}</p>}

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
                      (savedListing) => savedListing.listingId === listing.id,
                    )}
                  >
                    {savedListings.some(
                      (savedListing) => savedListing.listingId === listing.id,
                    )
                      ? "Saved"
                      : "Save listing"}
                  </button>
                  <Link className="details-link" to={`/listings/${listing.listingId || listing.id}`}>
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

function SavedPage({
  currentUser,
  onLogout,
  onRemoveSavedListing,
  removeErrorMessage,
  savedListings,
}) {
  if (!currentUser) {
    return (
      <main className="app-shell">
        <Navigation currentUser={currentUser} onLogout={onLogout} />

        <section className="hero-banner">
          <p className="eyebrow">Login Required</p>
          <h1>Please log in first</h1>
          <p className="hero-copy">
            Saved listings are available after login.
          </p>
          <div className="listing-actions">
            <Link className="details-link" to="/login">
              Go to login
            </Link>
            <Link className="details-link secondary-link" to="/signup">
              Create account
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Navigation currentUser={currentUser} onLogout={onLogout} />
      <section className="hero-banner">
        <p className="eyebrow">Saved Listings</p>
        <h1>Your shortlist</h1>
        <p className="hero-copy">
          Review the apartments you want to compare later.
        </p>
      </section>

      <section className="listings-section">
        {removeErrorMessage && (
          <p className="empty-state">{removeErrorMessage}</p>
        )}

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
                  <Link className="details-link" to={`/listings/${listing.listingId || listing.id}`}>
                    View details
                  </Link>
                  <Link className="details-link" to={`/inquiry/${listing.listingId || listing.id}`}>
                    Inquire
                  </Link>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => onRemoveSavedListing(listing.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function DashboardPage({ currentUser, onLogout, savedListings }) {
  if (!currentUser) {
    return (
      <main className="app-shell">
        <Navigation currentUser={currentUser} onLogout={onLogout} />

        <section className="hero-banner">
          <p className="eyebrow">Login Required</p>
          <h1>Please log in first</h1>
          <p className="hero-copy">
            Your private dashboard is available after login.
          </p>
          <div className="listing-actions">
            <Link className="details-link" to="/login">
              Go to login
            </Link>
            <Link className="details-link secondary-link" to="/signup">
              Create account
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Navigation currentUser={currentUser} onLogout={onLogout} />

      <section className="hero-banner">
        <p className="eyebrow">Private Dashboard</p>
        <h1>Welcome, {currentUser.fullName}</h1>
        <p className="hero-copy">
          This page uses the current logged-in user to show private rental
          activity.
        </p>
      </section>

      <section className="dashboard-grid">
        <article className="listing-card dashboard-card">
          <p className="listing-badge">Account</p>
          <h3>{currentUser.fullName}</h3>
          <p className="listing-location">{currentUser.email}</p>
        </article>

        <article className="listing-card dashboard-card">
          <p className="listing-badge">Saved listings</p>
          <h3>{savedListings.length}</h3>
          <p className="listing-location">
            {savedListings.length === 1
              ? "1 apartment in your shortlist"
              : `${savedListings.length} apartments in your shortlist`}
          </p>
          <Link className="details-link" to="/saved">
            View saved listings
          </Link>
        </article>

        <article className="listing-card dashboard-card">
          <p className="listing-badge">Inquiries</p>
          <h3>Manager</h3>
          <p className="listing-location">
            Review inquiry records from the database.
          </p>
          <Link className="details-link" to="/inquiries">
            Open inquiries
          </Link>
        </article>
      </section>
    </main>
  );
}
function Navigation({ currentUser, onLogout }) {
  return (
    <nav>
      <NavLink to="/">Browse</NavLink>
      <NavLink to="/saved">Saved</NavLink>
      <NavLink to="/inquiries">Inquiries</NavLink>
      {currentUser ? (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <span className="nav-user">Hi, {currentUser.fullName}</span>
          <button className="nav-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
}

function ListingDetailsPage({ currentUser, onLogout }) {
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
        <Navigation currentUser={currentUser} onLogout={onLogout} />
        <p className="empty-state">Loading listing details...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="app-shell">
        <Navigation currentUser={currentUser} onLogout={onLogout} />
        <p className="empty-state">{errorMessage}</p>
        <Link className="details-link" to="/">
          Back to browse
        </Link>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Navigation currentUser={currentUser} onLogout={onLogout} />
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

function InquiryPage({ currentUser, onLogout }) {
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
        <Navigation currentUser={currentUser} onLogout={onLogout} />
        <p className="empty-state">Loading inquiry details...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="app-shell">
        <Navigation currentUser={currentUser} onLogout={onLogout} />
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
      <Navigation currentUser={currentUser} onLogout={onLogout} />

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

function InquiriesPage({ currentUser, onLogout }) {
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

    if (currentUser) {
      loadInquiries();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <main className="app-shell">
        <Navigation currentUser={currentUser} onLogout={onLogout} />

        <section className="hero-banner">
          <p className="eyebrow">Login Required</p>
          <h1>Please log in first</h1>
          <p className="hero-copy">
            The inquiry manager is available after login.
          </p>
          <div className="listing-actions">
            <Link className="details-link" to="/login">
              Go to login
            </Link>
            <Link className="details-link secondary-link" to="/signup">
              Create account
            </Link>
          </div>
        </section>
      </main>
    );
  }

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
      <Navigation currentUser={currentUser} onLogout={onLogout} />

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

function SignupPage({ currentUser, onAuthSuccess, onLogout }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not sign up.");
      }

      onAuthSuccess(data.user, data.token);
      setSuccessMessage(`Signup successful for ${data.user.fullName}.`);
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="app-shell">
      <Navigation currentUser={currentUser} onLogout={onLogout} />

      <section className="hero-banner">
        <p className="eyebrow">Signup</p>
        <h1>Create your account</h1>
        <p className="hero-copy">
          Signup saves a new user with a hashed password in PostgreSQL.
        </p>
      </section>

      <section className="form-card auth-card">
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label className="form-field">
            Full name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
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
              required
            />
          </label>

          <label className="form-field">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="save-button form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create account"}
          </button>

          {successMessage && <p className="success-state">{successMessage}</p>}
          {errorMessage && <p className="empty-state">{errorMessage}</p>}
        </form>
      </section>
    </main>
  );
}

function LoginPage({ currentUser, onAuthSuccess, onLogout }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not log in.");
      }

      onAuthSuccess(data.user, data.token);
      setSuccessMessage(`Login successful. Welcome, ${data.user.fullName}.`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="app-shell">
      <Navigation currentUser={currentUser} onLogout={onLogout} />

      <section className="hero-banner">
        <p className="eyebrow">Login</p>
        <h1>Access your account</h1>
        <p className="hero-copy">
          Login checks an existing email and password against the stored hash.
        </p>
      </section>

      <section className="form-card auth-card">
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label className="form-field">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="save-button form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : "Log in"}
          </button>

          {successMessage && <p className="success-state">{successMessage}</p>}
          {errorMessage && <p className="empty-state">{errorMessage}</p>}
        </form>
      </section>
    </main>
  );
}
function App() {
  const [apiListings, setApiListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [removeErrorMessage, setRemoveErrorMessage] = useState("");

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

  useEffect(() => {
    async function loadSavedListings() {
      if (!currentUser) {
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/saved-listings", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not load saved listings.");
        }

        const data = await response.json();
        setSavedListings(data);
      } catch {
        setSaveErrorMessage("Could not load saved listings.");
      }
    }

    loadSavedListings();
  }, [authToken, currentUser]);

  function handleAuthSuccess(user, token) {
    setCurrentUser(user);
    setAuthToken(token);
  }

  function handleLogout() {
    setCurrentUser(null);
    setAuthToken("");
    setSavedListings([]);
    setSaveErrorMessage("");
    setRemoveErrorMessage("");
  }

  async function handleSaveListing(listing) {
    setSaveErrorMessage("");

    if (!currentUser) {
      setSaveErrorMessage("Please log in before saving listings.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/saved-listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          listingId: listing.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save listing.");
      }

      setSavedListings((currentSaved) => [...currentSaved, data.savedListing]);
    } catch (error) {
      setSaveErrorMessage(error.message);
    }
  }

  async function handleRemoveSavedListing(savedListingId) {
    setRemoveErrorMessage("");

    try {
      const response = await fetch(
        `http://localhost:4000/api/saved-listings/${savedListingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not remove saved listing.");
      }

      setSavedListings((currentSaved) =>
        currentSaved.filter((savedListing) => savedListing.id !== savedListingId),
      );
    } catch (error) {
      setRemoveErrorMessage(error.message);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BrowsePage
            currentUser={currentUser}
            listings={apiListings}
            onSaveListing={handleSaveListing}
            savedListings={savedListings}
            isLoading={isLoading}
            errorMessage={errorMessage}
            saveErrorMessage={saveErrorMessage}
            onLogout={handleLogout}
          />
        }
      />

      <Route
        path="/saved"
        element={
          <SavedPage
            currentUser={currentUser}
            onLogout={handleLogout}
            onRemoveSavedListing={handleRemoveSavedListing}
            removeErrorMessage={removeErrorMessage}
            savedListings={savedListings}
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <DashboardPage
            currentUser={currentUser}
            onLogout={handleLogout}
            savedListings={savedListings}
          />
        }
      />
      <Route
        path="/listings/:id"
        element={
          <ListingDetailsPage currentUser={currentUser} onLogout={handleLogout} />
        }
      />
      <Route
        path="/inquiry/:id"
        element={<InquiryPage currentUser={currentUser} onLogout={handleLogout} />}
      />
      <Route
        path="/inquiries"
        element={<InquiriesPage currentUser={currentUser} onLogout={handleLogout} />}
      />
      <Route
        path="/signup"
        element={
          <SignupPage
            currentUser={currentUser}
            onAuthSuccess={handleAuthSuccess}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            currentUser={currentUser}
            onAuthSuccess={handleAuthSuccess}
            onLogout={handleLogout}
          />
        }
      />
    </Routes>
  );
}

export default App;

























