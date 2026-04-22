import { useState } from 'react'
import './App.css'

const initialBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    status: 'reading',
  },
  {
    id: 2,
    title: 'Deep Work',
    author: 'Cal Newport',
    status: 'to-read',
  },
  {
    id: 3,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    status: 'finished',
  },
]

const statusLabels = {
  'to-read': 'To Read',
  reading: 'Reading',
  finished: 'Finished',
}

const nextStatus = {
  'to-read': 'reading',
  reading: 'finished',
  finished: 'to-read',
}

const emptyForm = {
  title: '',
  author: '',
  status: 'to-read',
}

function App() {
  const [books, setBooks] = useState(initialBooks)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState(emptyForm)
  const [editingBookId, setEditingBookId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const filteredBooks =
    filter === 'all' ? books : books.filter((book) => book.status === filter)

  const totalBooks = books.length
  const readingCount = books.filter((book) => book.status === 'reading').length
  const finishedCount = books.filter((book) => book.status === 'finished').length

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingBookId(null)
    setErrorMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = form.title.trim()
    const author = form.author.trim()

    if (!title || !author) {
      setErrorMessage('Please enter both a book title and an author.')
      return
    }

    if (editingBookId !== null) {
      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === editingBookId
            ? {
                ...book,
                title,
                author,
                status: form.status,
              }
            : book,
        ),
      )
    } else {
      setBooks((currentBooks) => [
        {
          id: Date.now(),
          title,
          author,
          status: form.status,
        },
        ...currentBooks,
      ])
    }

    resetForm()
  }

  function handleEdit(book) {
    setForm({
      title: book.title,
      author: book.author,
      status: book.status,
    })
    setEditingBookId(book.id)
    setErrorMessage('')
  }

  function handleDelete(bookId) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId),
    )

    if (editingBookId === bookId) {
      resetForm()
    }
  }

  function handleToggleStatus(bookId) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId
          ? { ...book, status: nextStatus[book.status] }
          : book,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Week 2 Project</p>
          <h1>Reading Queue</h1>
          <p className="hero-text">
            Track what you want to read, what you are reading now, and what you
            already finished.
          </p>
        </div>

        <div className="stats-grid" aria-label="Reading summary">
          <article className="stat-card">
            <span className="stat-label">Total books</span>
            <strong className="stat-value">{totalBooks}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">Reading now</span>
            <strong className="stat-value">{readingCount}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">Finished</span>
            <strong className="stat-value">{finishedCount}</strong>
          </article>
        </div>
      </section>

      <section className="workspace">
        <article className="panel form-panel">
          <div className="panel-heading">
            <h2>{editingBookId !== null ? 'Edit Book' : 'Add a Book'}</h2>
            <p>
              Use controlled inputs to save a new book or update an existing
              one.
            </p>
          </div>

          <form className="book-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Book title</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Clean Code"
              />
            </label>

            <label className="field">
              <span>Author</span>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Example: Robert C. Martin"
              />
            </label>

            <label className="field">
              <span>Status</span>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="to-read">To Read</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
              </select>
            </label>

            {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingBookId !== null ? 'Save changes' : 'Add to queue'}
              </button>
              {editingBookId !== null ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>
        </article>

        <article className="panel list-panel">
          <div className="panel-heading list-heading">
            <div>
              <h2>Your Queue</h2>
              <p>Filter the list and manage each book with small state updates.</p>
            </div>

            <div className="filter-row" aria-label="Filter books by status">
              <button
                className={filter === 'all' ? 'filter-button active' : 'filter-button'}
                type="button"
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={
                  filter === 'to-read' ? 'filter-button active' : 'filter-button'
                }
                type="button"
                onClick={() => setFilter('to-read')}
              >
                To Read
              </button>
              <button
                className={
                  filter === 'reading' ? 'filter-button active' : 'filter-button'
                }
                type="button"
                onClick={() => setFilter('reading')}
              >
                Reading
              </button>
              <button
                className={
                  filter === 'finished' ? 'filter-button active' : 'filter-button'
                }
                type="button"
                onClick={() => setFilter('finished')}
              >
                Finished
              </button>
            </div>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="empty-state">
              <h3>No books in this view yet.</h3>
              <p>Try another filter or add a new book from the form.</p>
            </div>
          ) : (
            <div className="book-list">
              {filteredBooks.map((book) => (
                <article className="book-card" key={book.id}>
                  <div className="book-card-top">
                    <span className={`status-badge ${book.status}`}>
                      {statusLabels[book.status]}
                    </span>
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                  </div>

                  <div className="card-actions">
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => handleToggleStatus(book.id)}
                    >
                      Move to {statusLabels[nextStatus[book.status]]}
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
