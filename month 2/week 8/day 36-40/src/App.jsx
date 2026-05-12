import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:4000/api'
const emptyListing = {
  title: '',
  city: '',
  monthly_rent: '',
  description: '',
}

function App() {
  const [view, setView] = useState('browse')
  const [listings, setListings] = useState([])
  const [myListings, setMyListings] = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rentalScoutUser')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('rentalScoutToken'))
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [listingForm, setListingForm] = useState(emptyListing)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [maxRent, setMaxRent] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const authHeaders = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token],
  )

  const cityOptions = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.city))).sort(),
    [listings],
  )

  const filteredListings = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()
    const rentLimit = Number(maxRent)

    return listings.filter((listing) => {
      const matchesSearch =
        !search ||
        listing.title.toLowerCase().includes(search) ||
        listing.description.toLowerCase().includes(search) ||
        listing.city.toLowerCase().includes(search)
      const matchesCity = cityFilter === 'all' || listing.city === cityFilter
      const matchesRent = !rentLimit || Number(listing.monthly_rent) <= rentLimit

      return matchesSearch && matchesCity && matchesRent
    })
  }, [cityFilter, listings, maxRent, searchTerm])

  const dashboardStats = useMemo(() => {
    const rents = myListings.map((listing) => Number(listing.monthly_rent))
    const averageRent = rents.length
      ? Math.round(rents.reduce((total, rent) => total + rent, 0) / rents.length)
      : 0

    return {
      totalListings: myListings.length,
      averageRent,
    }
  }, [myListings])

  async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, options)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || 'Request failed.')
    }

    if (response.status === 204) {
      return null
    }

    return response.json()
  }

  async function loadListings() {
    const data = await request('/listings')
    setListings(data)
  }

  async function loadMyListings() {
    if (!token) return
    const data = await request('/listings/mine', { headers: authHeaders })
    setMyListings(data)
  }

  useEffect(() => {
    let cancelled = false

    fetch(`${API_URL}/listings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load listings.')
        }

        return response.json()
      })
      .then((data) => {
        if (!cancelled) {
          setListings(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!token) return undefined

    let cancelled = false

    fetch(`${API_URL}/listings/mine`, { headers: authHeaders })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load your listings.')
        }

        return response.json()
      })
      .then((data) => {
        if (!cancelled) {
          setMyListings(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [token, authHeaders])

  async function handleAuth(event) {
    event.preventDefault()
    setError('')
    setStatus('')

    try {
      const path = authMode === 'login' ? '/auth/login' : '/auth/signup'
      const data = await request(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      })

      localStorage.setItem('rentalScoutToken', data.token)
      localStorage.setItem('rentalScoutUser', JSON.stringify(data.user))
      setToken(data.token)
      setUser(data.user)
      setAuthForm({ name: '', email: '', password: '' })
      setView('dashboard')
      setStatus('You are logged in.')
    } catch (err) {
      setError(err.message)
    }
  }

  function logout() {
    localStorage.removeItem('rentalScoutToken')
    localStorage.removeItem('rentalScoutUser')
    setToken(null)
    setUser(null)
    setMyListings([])
    setView('browse')
  }

  async function saveListing(event) {
    event.preventDefault()
    setError('')
    setStatus('')

    try {
      const path = editingId ? `/listings/${editingId}` : '/listings'
      const method = editingId ? 'PUT' : 'POST'

      await request(path, {
        method,
        headers: authHeaders,
        body: JSON.stringify(listingForm),
      })

      setListingForm(emptyListing)
      setEditingId(null)
      await Promise.all([loadListings(), loadMyListings()])
      setStatus(editingId ? 'Listing updated.' : 'Listing created.')
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteListing(id) {
    setError('')
    setStatus('')

    try {
      await request(`/listings/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      })
      await Promise.all([loadListings(), loadMyListings()])
      setStatus('Listing deleted.')
    } catch (err) {
      setError(err.message)
    }
  }

  function startEdit(listing) {
    setEditingId(listing.id)
    setListingForm({
      title: listing.title,
      city: listing.city,
      monthly_rent: listing.monthly_rent,
      description: listing.description,
    })
  }

  async function viewListingDetails(listing) {
    setError('')
    setStatus('')
    setDetailLoading(true)
    setSelectedListing(null)
    setView('details')

    try {
      const data = await request(`/listings/${listing.id}`)
      setSelectedListing(data)
    } catch (err) {
      setError(err.message)
      setView('browse')
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => setView('browse')}>
          Rental Scout
        </button>

        <nav>
          <button type="button" onClick={() => setView('browse')}>
            Browse
          </button>
          <button type="button" onClick={() => setView('dashboard')}>
            Dashboard
          </button>
          <button type="button" onClick={() => setView('demo')}>
            Demo
          </button>
          {user ? (
            <button type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <button type="button" onClick={() => setView('auth')}>
              Login
            </button>
          )}
        </nav>
      </header>

      {error && <p className="notice error">{error}</p>}
      {status && <p className="notice success">{status}</p>}

      {view === 'browse' && (
        <section className="page-grid">
          <div className="intro">
            <p className="eyebrow">Week 8 full-stack capstone</p>
            <h1>Find and manage rental listings.</h1>
            <p>
              Public users can browse database listings. Logged-in users can create,
              edit, and delete only their own listings.
            </p>
          </div>

          <section className="filter-panel">
            <label>
              Search
              <input
                placeholder="Title, city, or description"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <label>
              City
              <select
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
              >
                <option value="all">All cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Max rent
              <input
                min="0"
                placeholder="Example: 20000"
                type="number"
                value={maxRent}
                onChange={(event) => setMaxRent(event.target.value)}
              />
            </label>
          </section>

          <ListingGrid listings={filteredListings} onView={viewListingDetails} />
        </section>
      )}

      {view === 'details' && (
        <section className="detail-panel">
          <button className="link-button" type="button" onClick={() => setView('browse')}>
            Back to listings
          </button>
          {detailLoading && <p className="empty">Loading listing details...</p>}
          {!detailLoading && selectedListing && (
            <>
              <p className="eyebrow">{selectedListing.city}</p>
              <h1>{selectedListing.title}</h1>
              <strong className="detail-price">
                Rs. {Number(selectedListing.monthly_rent).toLocaleString('en-IN')} /
                month
              </strong>
              <p>{selectedListing.description}</p>
              {selectedListing.owner_name && (
                <small>Posted by {selectedListing.owner_name}</small>
              )}
            </>
          )}
        </section>
      )}

      {view === 'auth' && (
        <section className="narrow-panel">
          <h1>{authMode === 'login' ? 'Login' : 'Create account'}</h1>
          <form className="form" onSubmit={handleAuth}>
            {authMode === 'signup' && (
              <label>
                Name
                <input
                  value={authForm.name}
                  onChange={(event) =>
                    setAuthForm({ ...authForm, name: event.target.value })
                  }
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={authForm.email}
                onChange={(event) =>
                  setAuthForm({ ...authForm, email: event.target.value })
                }
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authForm.password}
                onChange={(event) =>
                  setAuthForm({ ...authForm, password: event.target.value })
                }
              />
            </label>
            <button className="primary" type="submit">
              {authMode === 'login' ? 'Login' : 'Sign up'}
            </button>
          </form>
          <button
            className="link-button"
            type="button"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          >
            {authMode === 'login'
              ? 'Need an account? Sign up'
              : 'Already have an account? Login'}
          </button>
        </section>
      )}

      {view === 'demo' && (
        <section className="demo-panel">
          <div>
            <p className="eyebrow">Demo checklist</p>
            <h1>Ready to present the app.</h1>
            <p>
              Use this order during review so the full-stack flow is easy to follow.
            </p>
          </div>

          <ol className="checklist">
            <li>Show public listings loaded from PostgreSQL.</li>
            <li>Use search, city, and rent filters on the Browse page.</li>
            <li>Open one listing detail view from the backend route.</li>
            <li>Sign up or login and open the protected dashboard.</li>
            <li>Create, edit, and delete one owned listing.</li>
            <li>Login with a second user and confirm ownership protection.</li>
          </ol>
        </section>
      )}

      {view === 'dashboard' &&
        (user ? (
          <section className="dashboard">
            <div>
              <p className="eyebrow">Protected page</p>
              <h1>{user.name}'s listings</h1>
            </div>

            <div className="stats-grid">
              <article>
                <span>Total listings</span>
                <strong>{dashboardStats.totalListings}</strong>
              </article>
              <article>
                <span>Average rent</span>
                <strong>
                  {dashboardStats.averageRent
                    ? `Rs. ${dashboardStats.averageRent.toLocaleString('en-IN')}`
                    : 'No data'}
                </strong>
              </article>
            </div>

            <form className="form listing-form" onSubmit={saveListing}>
              <label>
                Title
                <input
                  value={listingForm.title}
                  onChange={(event) =>
                    setListingForm({ ...listingForm, title: event.target.value })
                  }
                />
              </label>
              <label>
                City
                <input
                  value={listingForm.city}
                  onChange={(event) =>
                    setListingForm({ ...listingForm, city: event.target.value })
                  }
                />
              </label>
              <label>
                Monthly rent
                <input
                  type="number"
                  value={listingForm.monthly_rent}
                  onChange={(event) =>
                    setListingForm({
                      ...listingForm,
                      monthly_rent: event.target.value,
                    })
                  }
                />
              </label>
              <label className="wide">
                Description
                <textarea
                  value={listingForm.description}
                  onChange={(event) =>
                    setListingForm({
                      ...listingForm,
                      description: event.target.value,
                    })
                  }
                />
              </label>
              <button className="primary" type="submit">
                {editingId ? 'Update listing' : 'Create listing'}
              </button>
            </form>

            <ListingGrid
              listings={myListings}
              canManage
              onEdit={startEdit}
              onDelete={deleteListing}
            />
          </section>
        ) : (
          <section className="narrow-panel">
            <h1>Login required</h1>
            <p>This dashboard is protected. Login first to manage listings.</p>
            <button className="primary" type="button" onClick={() => setView('auth')}>
              Go to login
            </button>
          </section>
        ))}
    </main>
  )
}

function ListingGrid({ listings, canManage = false, onEdit, onDelete, onView }) {
  if (!listings.length) {
    return (
      <p className="empty">
        No listings found. Try changing the filters or create a new listing.
      </p>
    )
  }

  return (
    <div className="listing-grid">
      {listings.map((listing) => (
        <article className="listing-card" key={listing.id}>
          <div>
            <h2>{listing.title}</h2>
            <p>{listing.city}</p>
          </div>
          <strong>Rs. {Number(listing.monthly_rent).toLocaleString('en-IN')}</strong>
          <p>{listing.description}</p>
          {listing.owner_name && <small>Posted by {listing.owner_name}</small>}
          {onView && (
            <div className="card-actions">
              <button type="button" onClick={() => onView(listing)}>
                View details
              </button>
            </div>
          )}
          {canManage && (
            <div className="card-actions">
              <button type="button" onClick={() => onEdit(listing)}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(listing.id)}>
                Delete
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

export default App
