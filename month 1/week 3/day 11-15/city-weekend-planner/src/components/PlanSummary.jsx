function PlanSummary({ summary, plannerNote, onPlannerNoteChange }) {
  return (
    <section className="summary-panel" aria-labelledby="summary-heading">
      <div className="summary-grid">
        <article className="summary-card">
          <p className="summary-label">Saved stops</p>
          <strong className="summary-value">{summary.totalItems}</strong>
        </article>

        <article className="summary-card">
          <p className="summary-label">Estimated spend</p>
          <strong className="summary-value">{summary.totalCostLabel}</strong>
        </article>

        <article className="summary-card">
          <p className="summary-label">Neighborhoods</p>
          <strong className="summary-value">{summary.areaCount}</strong>
        </article>

        <article className="summary-card">
          <p className="summary-label">Notes added</p>
          <strong className="summary-value">{summary.noteCount}</strong>
        </article>
      </div>

      <article className="summary-card summary-note">
        <div>
          <p className="summary-label" id="summary-heading">
            Planner note
          </p>
          <h2>Keep one short note for the full weekend</h2>
        </div>
        <textarea
          value={plannerNote}
          onChange={(event) => onPlannerNoteChange(event.target.value)}
          placeholder="Example: Start near the river walk on Saturday morning and keep Sunday lighter."
        />
      </article>
    </section>
  )
}

export default PlanSummary
