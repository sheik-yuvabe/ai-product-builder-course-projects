function PlaylistCard({ track, isSelected, onSelect }) {
  return (
    <article className={`playlist-card ${isSelected ? 'selected' : ''}`}>
      <p className="card-label">{track.theme}</p>
      <h3>{track.title}</h3>
      <p className="card-artist">{track.artist}</p>
      <p className="card-detail">Mood: {track.mood}</p>
      <p className="card-detail">Votes: {track.votes}</p>

      <button type="button" onClick={() => onSelect(track.id)}>
        {isSelected ? 'Selected' : 'Choose this track'}
      </button>
    </article>
  )
}

export default PlaylistCard
