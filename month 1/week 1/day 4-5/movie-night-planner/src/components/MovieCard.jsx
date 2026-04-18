export function MovieCard({ movie, isShortlisted, onToggleShortlist }) {
  return (
    <article className="movie-card">
      <div className="card-top">
        <span className="pill">{movie.genre}</span>
        <span className="meta-text">{movie.year}</span>
      </div>

      <h3>{movie.title}</h3>
      <p className="movie-copy">{movie.description}</p>

      <div className="meta-row">
        <span>{movie.duration}</span>
        <span>{movie.mood}</span>
      </div>

      <button
        type="button"
        className={isShortlisted ? 'secondary-button' : 'primary-button'}
        onClick={() => onToggleShortlist(movie.id)}
      >
        {isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
      </button>
    </article>
  )
}
