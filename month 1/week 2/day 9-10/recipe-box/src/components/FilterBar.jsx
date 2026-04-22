function FilterBar({
  categories,
  selectedCategory,
  searchText,
  showFavoritesOnly,
  resultCount,
  onCategoryChange,
  onSearchChange,
  onFavoritesToggle,
  onResetFilters,
}) {
  return (
    <section className="panel filter-panel">
      <div className="panel-heading">
        <p className="section-label">Browse Recipes</p>
        <h2>Find what you want to cook</h2>
      </div>

      <div className="filter-grid">
        <label>
          Search by title
          <input
            type="text"
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search recipe name"
          />
        </label>

        <label>
          Category
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-actions">
        <button
          type="button"
          className={showFavoritesOnly ? 'chip chip-active' : 'chip'}
          onClick={onFavoritesToggle}
        >
          Favorites only
        </button>
        <button type="button" className="chip" onClick={onResetFilters}>
          Reset filters
        </button>
        <p className="results-text">{resultCount} recipes shown</p>
      </div>
    </section>
  )
}

export default FilterBar
