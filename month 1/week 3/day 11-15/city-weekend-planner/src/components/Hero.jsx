function Hero({ savedCount, filteredCount, planDate, onDateChange }) {
  return (
    <header className="hero-panel">
      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-tag">City Weekend Planner</p>
          <h1>Build a simple city plan that feels organized before the weekend starts.</h1>
          <p className="hero-text">
            Explore local ideas, combine filters, save the stops you like, then add notes and a date. Everything stays in local storage on this browser.
          </p>
          <div className="hero-stats" aria-label="planner quick stats">
            <div>
              <strong>{filteredCount}</strong>
              <span>activities to explore</span>
            </div>
            <div>
              <strong>{savedCount}</strong>
              <span>saved in your plan</span>
            </div>
          </div>
        </div>

        <div className="hero-side">
          <label className="hero-date-label" htmlFor="plan-date">
            Weekend date
          </label>
          <input
            id="plan-date"
            type="date"
            value={planDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
          <p className="hero-helper">
            Pick a date now, so your saved plan feels real and easy to revisit later.
          </p>
        </div>
      </div>
    </header>
  )
}

export default Hero
