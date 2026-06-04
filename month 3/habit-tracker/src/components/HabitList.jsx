function HabitList({
  habits,
  totalHabitCount,
  completedCount,
  isLoading,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <section className="habit-list-section">
      <h2>Today's habits</h2>
      <p className="progress-text">
        {completedCount} of {totalHabitCount} completed
      </p>

      {isLoading ? (
        <p className="empty-state">Loading habits...</p>
      ) : habits.length === 0 ? (
        <p className="empty-state">
          {totalHabitCount === 0
            ? 'No habits yet. Add your first habit above.'
            : 'No habits match your search or filter.'}
        </p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            <li className={habit.completed ? 'completed' : ''} key={habit.id}>
              <div className="habit-row">
                <label>
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => onToggle(habit.id)}
                  />
                  <span>{habit.name}</span>
                </label>
                <div className="habit-actions">
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => onEdit(habit)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-button danger-button"
                    type="button"
                    onClick={() => onDelete(habit.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default HabitList
