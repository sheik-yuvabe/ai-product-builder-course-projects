import { useState } from 'react'
import PlaylistCard from './components/PlaylistCard'
import { duelTracks } from './data/duelTracks'
import './App.css'

function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null)

  const selectedTrack = duelTracks.find((track) => track.id === selectedTrackId)
  const highestVotes = Math.max(...duelTracks.map((track) => track.votes))
  const crowdFavorite = duelTracks.find((track) => track.votes === highestVotes)

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Week 1 Day 2</p>
        <h1>Playlist Duel</h1>
        <p className="hero-copy">
          We are practicing arrays of objects, <code>map()</code>, reusable
          cards, and conditional UI.
        </p>
      </section>

      <section className="status-panel">
        <div>
          <p className="label">Current crowd favorite</p>
          <h2>{crowdFavorite.title}</h2>
          <p>
            {crowdFavorite.artist} with {crowdFavorite.votes} votes
          </p>
        </div>
        <div>
          <p className="label">Your current pick</p>
          <h2>{selectedTrack ? selectedTrack.title : 'No track selected yet'}</h2>
          <p>
            {selectedTrack
              ? `${selectedTrack.mood} mood from ${selectedTrack.artist}`
              : 'Click one track card below to inspect it.'}
          </p>
        </div>
      </section>

      <section className="card-grid">
        {duelTracks.map((track) => (
          <PlaylistCard
            key={track.id}
            track={track}
            isSelected={track.id === selectedTrackId}
            onSelect={setSelectedTrackId}
          />
        ))}
      </section>

      <section className="coach-panel">
        <h3>What to notice in this starter</h3>
        <ul>
          <li>
            <code>duelTracks</code> is an array of objects. Each object stores
            one track card's data.
          </li>
          <li>
            <code>map()</code> repeats the same card UI for every track.
          </li>
          <li>
            <code>selectedTrack</code> is derived state because we calculate it
            from <code>selectedTrackId</code> and the array.
          </li>
        </ul>
      </section>
    </main>
  )
}

export default App
