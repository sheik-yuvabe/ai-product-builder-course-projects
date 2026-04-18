export function FilterBar({
  searchTerm,
  selectedGenre,
  genreOptions,
  onSearchChange,
  onGenreChange,
}) {
  return (
    <section className="filter-bar">
      <label className="field">
        <span>Search by title or mood</span>
        <input
          type="text"
          placeholder="Try comedy, calm, family..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="field field--small">
        <span>Genre</span>
        <select
          value={selectedGenre}
          onChange={(event) => onGenreChange(event.target.value)}
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}
