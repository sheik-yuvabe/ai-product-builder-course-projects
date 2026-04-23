import { formatPrice } from '../utils/planner'

function ActivityCard({ activity, isSaved, onToggleSave }) {
  return (
    <article className="activity-card">
      <div className="card-topline">
        <div className="pill-row">
          <span className="pill">{activity.category}</span>
          <span className="pill">{activity.vibe}</span>
          {isSaved ? <span className="pill saved">Saved</span> : null}
        </div>
        <strong>{activity.rating}/5</strong>
      </div>

      <div className="card-body">
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
      </div>

      <ul className="meta-list" aria-label={`${activity.title} details`}>
        <li>{activity.neighborhood}</li>
        <li>{activity.time}</li>
        <li>{activity.duration}</li>
        <li>{formatPrice(activity.cost)}</li>
      </ul>

      <ul className="highlights-list" aria-label={`${activity.title} highlights`}>
        {activity.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <div className="card-actions">
        <p className="results-copy">
          Best for {activity.days.join(', ')} and a {activity.budget.toLowerCase()} plan.
        </p>
        <button
          type="button"
          className={`button ${isSaved ? 'button-secondary' : 'button-primary'}`}
          onClick={() => onToggleSave(activity.id)}
        >
          {isSaved ? 'Remove from plan' : 'Save to plan'}
        </button>
      </div>
    </article>
  )
}

export default ActivityCard
