import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import LandingPage from './pages/LandingPage'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const TOKEN_STORAGE_KEY = 'habit-tracker-token'
const USER_STORAGE_KEY = 'habit-tracker-user'

function getAuthHeaders(authToken) {
  return {
    Authorization: `Bearer ${authToken}`,
  }
}

async function fetchCompletions(authToken) {
  const response = await fetch(`${API_URL}/completions`, {
    headers: getAuthHeaders(authToken),
  })

  if (!response.ok) {
    throw new Error('Could not load completions')
  }

  return response.json()
}

function App() {
  const [authName, setAuthName] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY))
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY)

    return savedUser ? JSON.parse(savedUser) : null
  })
  const [habitName, setHabitName] = useState('')
  const [habits, setHabits] = useState([])
  const [editingHabitId, setEditingHabitId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [completions, setCompletions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isHistoryLoading, setIsHistoryLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      if (!token) {
        setIsLoading(false)
        setIsHistoryLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/habits`, {
          headers: getAuthHeaders(token),
        })

        if (!response.ok) {
          throw new Error('Could not load habits')
        }

        const habitsFromApi = await response.json()
        const completionsFromApi = await fetchCompletions(token)
        setHabits(habitsFromApi)
        setCompletions(completionsFromApi)
      } catch {
        setErrorMessage('Could not connect to the habit API.')
      } finally {
        setIsLoading(false)
        setIsHistoryLoading(false)
      }
    }

    loadDashboard()
  }, [token])

  function saveAuth(authData) {
    setToken(authData.token)
    setUser(authData.user)
    localStorage.setItem(TOKEN_STORAGE_KEY, authData.token)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authData.user))
    setAuthName('')
    setAuthEmail('')
    setAuthPassword('')
    setIsLoading(true)
    setIsHistoryLoading(true)
    setErrorMessage('')
  }

  function logout() {
    setToken(null)
    setUser(null)
    setHabits([])
    setCompletions([])
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  async function handleAuthSubmit(event, mode) {
    event.preventDefault()

    if (!authEmail.trim()) {
      setErrorMessage('Email is required.')
      return
    }

    if (!authEmail.includes('@')) {
      setErrorMessage('Enter a valid email address.')
      return
    }

    if (authPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    if (mode === 'signup' && !authName.trim()) {
      setErrorMessage('Name is required for signup.')
      return
    }

    try {
      setErrorMessage('')

      const response = await fetch(`${API_URL}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authName,
          email: authEmail,
          password: authPassword,
        }),
      })

      const authData = await response.json()

      if (!response.ok) {
        throw new Error(authData.message)
      }

      saveAuth(authData)
    } catch (error) {
      setErrorMessage(error.message || 'Authentication failed.')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedName = habitName.trim()

    if (!trimmedName) {
      setErrorMessage('Habit name is required.')
      return
    }

    if (trimmedName.length > 80) {
      setErrorMessage('Habit name must be 80 characters or less.')
      return
    }

    try {
      setErrorMessage('')

      if (editingHabitId) {
        const response = await fetch(`${API_URL}/habits/${editingHabitId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(token),
          },
          body: JSON.stringify({ name: trimmedName }),
        })

        if (!response.ok) {
          throw new Error('Could not update habit')
        }

        const updatedHabit = await response.json()

        setHabits(
          habits.map((habit) =>
            habit.id === editingHabitId
              ? { ...habit, name: updatedHabit.name }
              : habit,
          ),
        )
        setEditingHabitId(null)
      } else {
        const response = await fetch(`${API_URL}/habits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(token),
          },
          body: JSON.stringify({ name: trimmedName }),
        })

        if (!response.ok) {
          throw new Error('Could not create habit')
        }

        const newHabit = await response.json()

        setHabits([{ ...newHabit, completed: false }, ...habits])
      }

      setHabitName('')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  async function toggleHabit(habitId) {
    const habitToToggle = habits.find((habit) => habit.id === habitId)

    if (!habitToToggle) {
      return
    }

    const nextCompleted = !habitToToggle.completed

    try {
      setErrorMessage('')

      const response = await fetch(`${API_URL}/completions/habits/${habitId}/today`, {
        method: nextCompleted ? 'POST' : 'DELETE',
        headers: getAuthHeaders(token),
      })

      if (!response.ok) {
        throw new Error('Could not update completion')
      }

      setHabits(
        habits.map((habit) =>
          habit.id === habitId ? { ...habit, completed: nextCompleted } : habit,
        ),
      )
      setCompletions(await fetchCompletions(token))
    } catch {
      setErrorMessage('Could not update today\'s completion.')
    }
  }

  function startEditing(habit) {
    setEditingHabitId(habit.id)
    setHabitName(habit.name)
  }

  function cancelEditing() {
    setEditingHabitId(null)
    setHabitName('')
  }

  async function deleteHabit(habitId) {
    try {
      setErrorMessage('')

      const response = await fetch(`${API_URL}/habits/${habitId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      })

      if (!response.ok) {
        throw new Error('Could not delete habit')
      }

      setHabits(habits.filter((habit) => habit.id !== habitId))

      if (editingHabitId === habitId) {
        cancelEditing()
      }
      setCompletions(await fetchCompletions(token))
    } catch {
      setErrorMessage('Could not delete the habit. Please try again.')
    }
  }

  const completedCount = habits.filter((habit) => habit.completed).length
  const visibleHabits = habits.filter((habit) => {
    const matchesSearch = habit.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && habit.completed) ||
      (statusFilter === 'active' && !habit.completed)

    return matchesSearch && matchesStatus
  })

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Daily routine</p>
        <h1>Habit Tracker</h1>
        <p>Build better routines, one day at a time.</p>
      </header>

      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        {token ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/history">History</NavLink>
          </>
        ) : (
          <NavLink to="/auth">Login</NavLink>
        )}
      </nav>

      {token && (
        <section className="user-card">
          <p>Logged in as {user?.name}</p>
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        </section>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Routes>
        <Route path="/" element={<LandingPage token={token} />} />
        <Route
          path="/auth"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage
                authName={authName}
                authEmail={authEmail}
                authPassword={authPassword}
                onAuthNameChange={setAuthName}
                onAuthEmailChange={setAuthEmail}
                onAuthPasswordChange={setAuthPassword}
                onAuthSubmit={handleAuthSubmit}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <DashboardPage
                habitName={habitName}
                editingHabitId={editingHabitId}
                habits={habits}
                visibleHabits={visibleHabits}
                completedCount={completedCount}
                isLoading={isLoading}
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                onHabitNameChange={setHabitName}
                onSubmit={handleSubmit}
                onCancelEditing={cancelEditing}
                onSearchChange={setSearchTerm}
                onFilterChange={setStatusFilter}
                onToggle={toggleHabit}
                onEdit={startEditing}
                onDelete={deleteHabit}
              />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/history"
          element={
            token ? (
              <HistoryPage
                completions={completions}
                isHistoryLoading={isHistoryLoading}
              />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
