import { useState } from "react";
import "./App.css";

const workshopDetails = {
  title: "Workshop RSVP + Ticket Preview",
  date: "April 27, 2026",
  time: "11:00 AM",
  location: "Creator Lab, Chennai",
  mentor: "Yuvabe Frontend Studio",
};

const initialForm = {
  fullName: "",
  email: "",
  ticketType: "Standard",
  seats: "1",
  reason: "",
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.fullName.trim() === "" || formData.email.trim() === "") {
      setSuccessMessage("");
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSuccessMessage("RSVP saved successfully!");
    setFormData(initialForm);
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Week 1 Day 3 Practice</p>
        <h1>Build a workshop RSVP form with a live ticket preview.</h1>
        <p className="hero-copy">
          This starter focuses on the first two ideas for this project:
          controlled inputs and showing a preview directly from React state.
        </p>
      </section>

      <section className="workspace">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <div>
            <p className="section-label">RSVP Form</p>
            <h2>Tell us about your booking</h2>
            <p className="section-copy">
              Every input below is connected to React state using `value` and
              `onChange`.
            </p>
          </div>

          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="field">
            <span>Ticket type</span>
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
            >
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
              <option value="Student">Student</option>
            </select>
          </label>

          <label className="field">
            <span>Number of seats</span>
            <select name="seats" value={formData.seats} onChange={handleChange}>
              <option value="1">1 seat</option>
              <option value="2">2 seats</option>
              <option value="3">3 seats</option>
              <option value="4">4 seats</option>
            </select>
          </label>

          <label className="field">
            <span>Why do you want to join?</span>
            <textarea
              name="reason"
              rows="4"
              placeholder="Example: I want to improve my React form skills."
              value={formData.reason}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-button">
            Save RSVP Draft
          </button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <p className="coach-note">
            We already used `onSubmit` and `preventDefault()` so the page does
            not refresh. Next, you can add validation, success and error
            messages, and reset logic.
          </p>
        </form>

        <aside className="panel ticket-panel">
          <div className="ticket-top">
            <p className="ticket-label">Live Ticket Preview</p>
            <span className="ticket-badge">{formData.ticketType}</span>
          </div>

          <h2>{formData.fullName || "Your attendee name will show here"}</h2>
          <p className="ticket-email">
            {formData.email || "Your email preview will appear here"}
          </p>

          <div className="ticket-grid">
            <div>
              <span className="meta-label">Workshop</span>
              <strong>{workshopDetails.title}</strong>
            </div>
            <div>
              <span className="meta-label">Date</span>
              <strong>{workshopDetails.date}</strong>
            </div>
            <div>
              <span className="meta-label">Time</span>
              <strong>{workshopDetails.time}</strong>
            </div>
            <div>
              <span className="meta-label">Venue</span>
              <strong>{workshopDetails.location}</strong>
            </div>
            <div>
              <span className="meta-label">Mentor</span>
              <strong>{workshopDetails.mentor}</strong>
            </div>
            <div>
              <span className="meta-label">Seats</span>
              <strong>{formData.seats}</strong>
            </div>
          </div>

          <div className="reason-box">
            <span className="meta-label">Why you are joining</span>
            <p>
              {formData.reason ||
                "Your reason will appear here as soon as you type in the form."}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default App;
