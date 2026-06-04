import HabitFilters from '../components/HabitFilters'
import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'

function DashboardPage({
  habitName,
  editingHabitId,
  habits,
  visibleHabits,
  completedCount,
  isLoading,
  searchTerm,
  statusFilter,
  onHabitNameChange,
  onSubmit,
  onCancelEditing,
  onSearchChange,
  onFilterChange,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <HabitForm
        habitName={habitName}
        isEditing={editingHabitId !== null}
        onHabitNameChange={onHabitNameChange}
        onSubmit={onSubmit}
        onCancel={onCancelEditing}
      />

      <HabitFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onFilterChange={onFilterChange}
      />

      <HabitList
        habits={visibleHabits}
        totalHabitCount={habits.length}
        completedCount={completedCount}
        isLoading={isLoading}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
}

export default DashboardPage
