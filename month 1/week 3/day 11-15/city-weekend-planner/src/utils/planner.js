export const defaultFilters = {
  search: '',
  category: 'All',
  day: 'Any day',
  vibe: 'All vibes',
  budget: 'Any budget',
  sortBy: 'recommended',
}

export function loadLocalValue(key, fallbackValue) {
  const storedValue = localStorage.getItem(key)

  if (!storedValue) {
    return fallbackValue
  }

  try {
    return JSON.parse(storedValue)
  } catch {
    return fallbackValue
  }
}

export function saveLocalValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function formatPrice(amount) {
  if (amount === 0) {
    return 'Free'
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function getDurationHours(durationText) {
  return Number.parseFloat(durationText)
}

export function getFilteredActivities(activities, filters) {
  const searchText = filters.search.trim().toLowerCase()

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      searchText === '' ||
      `${activity.title} ${activity.neighborhood} ${activity.description} ${activity.highlights.join(' ')}`
        .toLowerCase()
        .includes(searchText)

    const matchesCategory =
      filters.category === 'All' || activity.category === filters.category

    const matchesDay =
      filters.day === 'Any day' || activity.days.includes(filters.day)

    const matchesVibe =
      filters.vibe === 'All vibes' || activity.vibe === filters.vibe

    const matchesBudget =
      filters.budget === 'Any budget' || activity.budget === filters.budget

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDay &&
      matchesVibe &&
      matchesBudget
    )
  })

  return filteredActivities.sort((firstActivity, secondActivity) => {
    if (filters.sortBy === 'low-cost') {
      return firstActivity.cost - secondActivity.cost
    }

    if (filters.sortBy === 'high-cost') {
      return secondActivity.cost - firstActivity.cost
    }

    if (filters.sortBy === 'shortest') {
      return (
        getDurationHours(firstActivity.duration) -
        getDurationHours(secondActivity.duration)
      )
    }

    if (filters.sortBy === 'alphabetical') {
      return firstActivity.title.localeCompare(secondActivity.title)
    }

    return secondActivity.rating - firstActivity.rating
  })
}

export function getSavedActivities(activities, savedPlan) {
  return savedPlan
    .map((savedItem) => {
      const activity = activities.find((item) => item.id === savedItem.activityId)

      if (!activity) {
        return null
      }

      return {
        ...activity,
        note: savedItem.note,
      }
    })
    .filter(Boolean)
}

export function buildPlanSummary(savedActivities) {
  const totalCost = savedActivities.reduce(
    (runningTotal, activity) => runningTotal + activity.cost,
    0,
  )
  const noteCount = savedActivities.filter((activity) => activity.note.trim() !== '').length
  const areaCount = new Set(savedActivities.map((activity) => activity.neighborhood)).size

  return {
    totalItems: savedActivities.length,
    totalCostLabel: formatPrice(totalCost),
    noteCount,
    areaCount,
  }
}
