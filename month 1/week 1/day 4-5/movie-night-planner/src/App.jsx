import { useState } from 'react'
import './App.css'
import { FilterBar } from './components/FilterBar'
import { MovieCard } from './components/MovieCard'
import { movieOptions } from './data/movies'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [shortlistedIds, setShortlistedIds] = useState([])

  const genreOptions = ['All', ...new Set(movieOptions.map((movie) => movie.genre))]

  const visibleMovies = movieOptions.filter((movie) => {
    const searchText = searchTerm.trim().toLowerCase()
    const matchesSearch =
      movie.title.toLowerCase().includes(searchText) ||
      movie.mood.toLowerCase().includes(searchText)
    const matchesGenre =
      selectedGenre === 'All' || movie.genre === selectedGenre

    return matchesSearch && matchesGenre
  })

  const shortlistedMovies = movieOptions.filter((movie) =>
    shortlistedIds.includes(movie.id),
  )

  function handleToggleShortlist(movieId) {
    setShortlistedIds((currentIds) =>
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId],
    )
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Week 1 Days 4-5 Integration Task</p>
        <h1>Movie Night Planner</h1>
        <p className="hero-copy">
          This starter teaches the new ideas for this project: break the UI
          into components, keep shared state in the parent, and pass callbacks
          down so child components can update that state.
        </p>
      </section>

      <section className="summary-strip">
        <div className="summary-card">
          <span>Visible movies</span>
          <strong>{visibleMovies.length}</strong>
        </div>
        <div className="summary-card">
          <span>Shortlisted</span>
          <strong>{shortlistedMovies.length}</strong>
        </div>
        <div className="summary-card">
          <span>Current filter</span>
          <strong>{selectedGenre}</strong>
        </div>
      </section>

      <FilterBar
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        genreOptions={genreOptions}
        onSearchChange={setSearchTerm}
        onGenreChange={setSelectedGenre}
      />

      <section className="workspace">
        <section className="panel movie-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">Movie List</p>
              <h2>Choose what matches the mood</h2>
            </div>
            <p className="section-copy">
              `App.jsx` owns the search text, filter value, and shortlist so
              every section can stay in sync.
            </p>
          </div>

          {visibleMovies.length === 0 ? (
            <div className="empty-state">
              <h3>No movies match this search yet.</h3>
              <p>
                Try clearing the search box or change the genre filter to
                `All`.
              </p>
            </div>
          ) : (
            <div className="movie-grid">
              {visibleMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isShortlisted={shortlistedIds.includes(movie.id)}
                  onToggleShortlist={handleToggleShortlist}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="panel shortlist-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">Shared State Result</p>
              <h2>Your shortlist</h2>
            </div>
            <p className="section-copy">
              This panel updates because the parent component passes the same
              shortlist state to both the cards and this sidebar.
            </p>
          </div>

          {shortlistedMovies.length === 0 ? (
            <div className="empty-state empty-state--soft">
              <h3>No picks yet</h3>
              <p>
                Click `Add to shortlist` on any card to see lifted state in
                action.
              </p>
            </div>
          ) : (
            <ul className="shortlist">
              {shortlistedMovies.map((movie) => (
                <li key={movie.id} className="shortlist-item">
                  <div>
                    <strong>{movie.title}</strong>
                    <p>
                      {movie.genre} . {movie.duration}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => handleToggleShortlist(movie.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="coach-note">
            <h3>What to study in this version</h3>
            <ol>
              <li>Find the three `useState` values in `App.jsx`.</li>
              <li>See how `FilterBar` receives props from the parent.</li>
              <li>See how `MovieCard` calls a parent function using a callback.</li>
            </ol>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
