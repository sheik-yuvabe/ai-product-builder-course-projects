function FilterPanel({
  filters,
  categoryOptions,
  dayOptions,
  vibeOptions,
  budgetOptions,
  onFilterChange,
  onReset,
}) {
  return (
    <div className="filter-grid">
      <div className="field-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          name="search"
          type="text"
          value={filters.search}
          onChange={onFilterChange}
          placeholder="Museum, brunch, rooftop..."
        />
      </div>

      <div className="field-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={filters.category} onChange={onFilterChange}>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="day">Day</label>
        <select id="day" name="day" value={filters.day} onChange={onFilterChange}>
          {dayOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="vibe">Vibe</label>
        <select id="vibe" name="vibe" value={filters.vibe} onChange={onFilterChange}>
          {vibeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="budget">Budget</label>
        <select id="budget" name="budget" value={filters.budget} onChange={onFilterChange}>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="sortBy">Sort by</label>
        <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={onFilterChange}>
          <option value="recommended">Recommended</option>
          <option value="low-cost">Cost: low to high</option>
          <option value="high-cost">Cost: high to low</option>
          <option value="shortest">Shortest time</option>
          <option value="alphabetical">A to Z</option>
        </select>
      </div>

      <div className="filter-actions">
        <button type="button" className="button button-secondary" onClick={onReset}>
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
