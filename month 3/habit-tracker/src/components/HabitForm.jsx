function HabitForm({
  habitName,
  isEditing,
  onHabitNameChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="habit-card">
      <h2>{isEditing ? 'Edit habit' : 'Add a habit'}</h2>
      <form className="habit-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Example: Drink water"
          maxLength="80"
          required
          value={habitName}
          onChange={(event) => onHabitNameChange(event.target.value)}
        />
        <button type="submit">{isEditing ? 'Save Habit' : 'Add Habit'}</button>
        {isEditing && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </section>
  )
}

export default HabitForm
