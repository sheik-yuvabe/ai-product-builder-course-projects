import { useEffect, useState } from 'react'
import './App.css'
import ActivityCard from './components/ActivityCard'
import FilterPanel from './components/FilterPanel'
import Hero from './components/Hero'
import PlanSummary from './components/PlanSummary'
import SavedPlan from './components/SavedPlan'
import { activities } from './data/activities'
import {
  buildPlanSummary,
  defaultFilters,
  getFilteredActivities,
  getSavedActivities,
  loadLocalValue,
  saveLocalValue,
} from './utils/planner'

function App() {
  const [filters, setFilters] = useState(defaultFilters)
  const [savedPlan, setSavedPlan] = useState(() =>
    loadLocalValue('city-planner-saved-plan', []),
  )
  const [planDate, setPlanDate] = useState(() =>
    loadLocalValue('city-planner-date', ''),
  )
  const [plannerNote, setPlannerNote] = useState(() =>
    loadLocalValue('city-planner-note', ''),
  )

  useEffect(() => {
    saveLocalValue('city-planner-saved-plan', savedPlan)
  }, [savedPlan])

  useEffect(() => {
    saveLocalValue('city-planner-date', planDate)
  }, [planDate])

  useEffect(() => {
    saveLocalValue('city-planner-note', plannerNote)
  }, [plannerNote])

  const filteredActivities = getFilteredActivities(activities, filters)
  const savedActivities = getSavedActivities(activities, savedPlan)
  const summary = buildPlanSummary(savedActivities)

  const categoryOptions = [
    'All',
    ...new Set(activities.map((activity) => activity.category)),
  ]
  const dayOptions = ['Any day', 'Friday', 'Saturday', 'Sunday']
  const vibeOptions = [
    'All vibes',
    ...new Set(activities.map((activity) => activity.vibe)),
  ]
  const budgetOptions = ['Any budget', 'Free', 'Budget', 'Treat']

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  function resetFilters() {
    setFilters(defaultFilters)
  }

  function toggleSavedItem(activityId) {
    setSavedPlan((currentPlan) => {
      const alreadySaved = currentPlan.some((item) => item.activityId === activityId)

      if (alreadySaved) {
        return currentPlan.filter((item) => item.activityId !== activityId)
      }

      return [...currentPlan, { activityId, note: '' }]
    })
  }

  function updateSavedNote(activityId, note) {
    setSavedPlan((currentPlan) =>
      currentPlan.map((item) =>
        item.activityId === activityId ? { ...item, note } : item,
      ),
    )
  }

  function clearPlan() {
    setSavedPlan([])
    setPlannerNote('')
  }

  return (
    <div className="app-shell">
      <Hero
        savedCount={summary.totalItems}
        filteredCount={filteredActivities.length}
        planDate={planDate}
        onDateChange={setPlanDate}
      />

      <main className="app-main">
        <PlanSummary summary={summary} plannerNote={plannerNote} onPlannerNoteChange={setPlannerNote} />

        <section className="panel" aria-labelledby="filters-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Step 1</p>
              <h2 id="filters-heading">Explore and filter activities</h2>
            </div>
            <p className="section-copy">
              Search by name, narrow the list with multiple filters, then save the places that fit your weekend.
            </p>
          </div>

          <FilterPanel
            filters={filters}
            categoryOptions={categoryOptions}
            dayOptions={dayOptions}
            vibeOptions={vibeOptions}
            budgetOptions={budgetOptions}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />

          <div className="card-grid" aria-live="polite">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isSaved={savedPlan.some((item) => item.activityId === activity.id)}
                  onToggleSave={toggleSavedItem}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No matches found</h3>
                <p>Try a different day, budget, or search word. You can also press Reset filters.</p>
              </div>
            )}
          </div>
        </section>

        <SavedPlan
          items={savedActivities}
          onToggleSave={toggleSavedItem}
          onUpdateSavedNote={updateSavedNote}
          onClearPlan={clearPlan}
        />
      </main>
    </div>
  )
}

export default App
