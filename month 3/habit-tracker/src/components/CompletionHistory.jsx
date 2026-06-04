function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue))
}

function CompletionHistory({ completions, isLoading }) {
  return (
    <section className="history-card">
      <h2>Completion history</h2>

      {isLoading ? (
        <p className="empty-state">Loading history...</p>
      ) : completions.length === 0 ? (
        <p className="empty-state">
          No completions yet. Check a habit to create history.
        </p>
      ) : (
        <ul className="history-list">
          {completions.map((completion) => (
            <li key={completion.id}>
              <span>{completion.habit_name}</span>
              <time dateTime={completion.completed_date}>
                {formatDate(completion.completed_date)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CompletionHistory
