const filterOptions = ['all', 'active', 'completed']

function HabitFilters({ searchTerm, statusFilter, onSearchChange, onFilterChange }) {
  return (
    <section className="filter-card">
      <h2>Find habits</h2>
      <input
        className="search-input"
        type="search"
        placeholder="Search habits"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <div className="filter-buttons">
        {filterOptions.map((option) => (
          <button
            className={statusFilter === option ? 'filter-button active-filter' : 'filter-button'}
            type="button"
            key={option}
            onClick={() => onFilterChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  )
}

export default HabitFilters
