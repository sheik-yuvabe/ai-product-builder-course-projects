import { useState } from "react";
import "./App.css";
import { Routes, Route, NavLink, Link, useParams } from "react-router";

const listings = [
  {
    id: 1,
    title: "Sunrise Court Studio",
    location: "Velachery, Chennai",
    rent: "Rs. 14,500 / month",
    bedrooms: "1 bed",
    badge: "Near metro",
  },
  {
    id: 2,
    title: "Maple Nest Apartment",
    location: "Thoraipakkam, Chennai",
    rent: "Rs. 22,000 / month",
    bedrooms: "2 beds",
    badge: "Fully furnished",
  },
  {
    id: 3,
    title: "Harbor View Homes",
    location: "Perungudi, Chennai",
    rent: "Rs. 28,500 / month",
    bedrooms: "3 beds",
    badge: "Family friendly",
  },
];

function BrowsePage({ listings, onSaveListing, savedListings }) {
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
    </nav>
  );
}

function ListingDetailsPage() {
  const { id } = useParams();
  const selectedListing = listings.find((listing) => listing.id === Number(id));

  if (!selectedListing) {
    return (
      <>
        <Navigation />
        <h2>Listing not found</h2>
      </>
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
            A simple local details page for now. Later, a backend can replace
            this sample data with real listings.
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
  const selectedListing = listings.find((listing) => listing.id === Number(id));
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!selectedListing) {
    return (
      <main className="app-shell">
        <Navigation />
        <section className="hero-banner">
          <p className="eyebrow">Inquiry</p>
          <h1>Listing not found</h1>
          <p className="hero-copy">
            This inquiry link does not match a listing in the local sample data.
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

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
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

            <button className="save-button form-submit" type="submit">
              Submit inquiry
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

function App() {
  const [savedListings, setSavedListings] = useState([]);

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
            listings={listings}
            onSaveListing={handleSaveListing}
            savedListings={savedListings}
          />
        }
      />

      <Route
        path="/saved"
        element={<SavedPage savedListings={savedListings} />}
      />

      <Route path="/listings/:id" element={<ListingDetailsPage />} />
      <Route path="/inquiry/:id" element={<InquiryPage />} />
    </Routes>
  );
}

export default App;
