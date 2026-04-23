import { formatPrice } from '../utils/planner'

function SavedPlan({ items, onToggleSave, onUpdateSavedNote, onClearPlan }) {
  return (
    <section className="panel saved-panel" aria-labelledby="saved-plan-heading">
      <div className="saved-header">
        <div>
          <p className="eyebrow">Step 2</p>
          <h2 id="saved-plan-heading">Build your saved plan</h2>
        </div>
        {items.length > 0 ? (
          <button type="button" className="button button-danger" onClick={onClearPlan}>
            Clear plan
          </button>
        ) : null}
      </div>

      {items.length > 0 ? (
        <div className="saved-list">
          {items.map((item) => (
            <article key={item.id} className="saved-card">
              <div className="saved-topline">
                <div>
                  <h3>{item.title}</h3>
                  <p className="saved-hint">
                    {item.neighborhood} • {item.time}
                  </p>
                </div>
                <span className="pill saved">{formatPrice(item.cost)}</span>
              </div>

              <div className="saved-details">
                <ul className="saved-meta">
                  <li>{item.category}</li>
                  <li>{item.vibe}</li>
                  <li>{item.duration}</li>
                  <li>{item.days.join(', ')}</li>
                </ul>
              </div>

              <div className="field-group">
                <label htmlFor={`note-${item.id}`}>Your note</label>
                <textarea
                  id={`note-${item.id}`}
                  value={item.note}
                  onChange={(event) => onUpdateSavedNote(item.id, event.target.value)}
                  placeholder="Why does this stop matter? Add timing, food ideas, or a reminder."
                />
              </div>

              <div className="saved-actions">
                <p className="saved-hint">Tip: short notes are enough. You can always edit later.</p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => onToggleSave(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Your plan is empty</h3>
          <p>Save a few activities first. Then this section becomes your local weekend shortlist with notes.</p>
        </div>
      )}
    </section>
  )
}

export default SavedPlan
