import { useState } from 'react'
import './App.css'

const CATEGORY_OPTIONS = ['Travel', 'Food', 'Stay', 'Fun', 'Tickets', 'Other']

const starterExpenses = [
  { id: 1, title: 'Petrol for the drive', category: 'Travel', amount: 2200 },
  { id: 2, title: 'Resort room advance', category: 'Stay', amount: 4800 },
  { id: 3, title: 'Dinner at the food court', category: 'Food', amount: 1650 },
  { id: 4, title: 'Adventure park entry', category: 'Tickets', amount: 1200 },
]

const initialExpenseForm = {
  title: '',
  amount: '',
  category: 'Travel',
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value)
}

function getCategoryTotal(expenses, category) {
  return expenses
    .filter((expense) => expense.category === category)
    .reduce((sum, expense) => sum + expense.amount, 0)
}

function App() {
  const [tripName, setTripName] = useState('Yelagiri Road Trip')
  const [splitCount, setSplitCount] = useState('4')
  const [expenseForm, setExpenseForm] = useState(initialExpenseForm)
  const [expenses, setExpenses] = useState(starterExpenses)
  const [errorMessage, setErrorMessage] = useState('')

  const peopleCount = Number.parseInt(splitCount, 10)
  const validPeopleCount = Number.isInteger(peopleCount) && peopleCount > 0

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  )
  const perPersonAmount = validPeopleCount ? totalAmount / peopleCount : 0
  const categoryTotals = CATEGORY_OPTIONS.map((category) => ({
    category,
    total: getCategoryTotal(expenses, category),
  })).filter((item) => item.total > 0)

  function handleExpenseChange(event) {
    const { name, value } = event.target

    setExpenseForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleAddExpense(event) {
    event.preventDefault()

    const cleanTitle = expenseForm.title.trim()
    const parsedAmount = Number.parseFloat(expenseForm.amount)

    if (!cleanTitle) {
      setErrorMessage('Enter what the expense was for before adding it.')
      return
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Enter a valid amount greater than 0.')
      return
    }

    if (!validPeopleCount) {
      setErrorMessage('Enter a valid number of people to split the total.')
      return
    }

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        id: Date.now(),
        title: cleanTitle,
        category: expenseForm.category,
        amount: parsedAmount,
      },
    ])

    setExpenseForm((currentForm) => ({
      ...currentForm,
      title: '',
      amount: '',
    }))
    setErrorMessage('')
  }

  function handleResetDemo() {
    setTripName('Yelagiri Road Trip')
    setSplitCount('4')
    setExpenseForm(initialExpenseForm)
    setExpenses(starterExpenses)
    setErrorMessage('')
  }

  return (
    <main className="app-shell">
      <section className="hero panel">
        <p className="eyebrow">Week 2 Day 8 project</p>
        <h1>Weekend Budget Splitter</h1>
        <p className="hero-copy">
          Track each shared expense, see the total instantly, and split the
          cost fairly per person.
        </p>
      </section>

      <section className="workspace">
        <div className="panel stack">
          <div className="panel-heading">
            <div>
              <p className="section-label">Trip setup</p>
              <h2>Start with the basic numbers</h2>
            </div>
            <button className="ghost-button" onClick={handleResetDemo}>
              Reset starter data
            </button>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Weekend name</span>
              <input
                type="text"
                value={tripName}
                onChange={(event) => setTripName(event.target.value)}
                placeholder="Ex: Pondy beach trip"
              />
            </label>

            <label className="field">
              <span>Number of people</span>
              <input
                type="number"
                min="1"
                value={splitCount}
                onChange={(event) => setSplitCount(event.target.value)}
                placeholder="4"
              />
            </label>
          </div>

          <form className="expense-form" onSubmit={handleAddExpense}>
            <div className="panel-heading">
              <div>
                <p className="section-label">Add expense</p>
                <h2>Practice numeric input + validation</h2>
              </div>
            </div>

            <div className="field-grid">
              <label className="field">
                <span>Expense title</span>
                <input
                  type="text"
                  name="title"
                  value={expenseForm.title}
                  onChange={handleExpenseChange}
                  placeholder="Ex: Villa rent"
                />
              </label>

              <label className="field">
                <span>Amount</span>
                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="0.01"
                  value={expenseForm.amount}
                  onChange={handleExpenseChange}
                  placeholder="1500"
                />
              </label>

              <label className="field">
                <span>Category</span>
                <select
                  name="category"
                  value={expenseForm.category}
                  onChange={handleExpenseChange}
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {errorMessage ? <p className="message error">{errorMessage}</p> : null}

            {!validPeopleCount ? (
              <p className="message hint">
                Add a people count greater than 0 to calculate the split.
              </p>
            ) : null}

            <button className="primary-button" type="submit">
              Add expense
            </button>
          </form>
        </div>

        <div className="panel stack">
          <div className="panel-heading">
            <div>
              <p className="section-label">Expense list</p>
              <h2>{tripName || 'Your weekend budget'}</h2>
            </div>
            <span className="badge">{expenses.length} items</span>
          </div>

          {expenses.length === 0 ? (
            <div className="empty-state">
              <h3>No expenses added yet</h3>
              <p>Add your first shared cost to start the split.</p>
            </div>
          ) : (
            <div className="expense-list">
              {expenses.map((expense) => (
                <article className="expense-card" key={expense.id}>
                  <div>
                    <p className="expense-category">{expense.category}</p>
                    <h3>{expense.title}</h3>
                  </div>
                  <strong>{formatCurrency(expense.amount)}</strong>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="panel summary-card">
          <p className="section-label">Budget summary</p>
          <h2>Derived values</h2>

          <div className="summary-grid">
            <div>
              <span>Total spent</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>
            <div>
              <span>Per person</span>
              <strong>
                {validPeopleCount ? formatCurrency(perPersonAmount) : 'Waiting...'}
              </strong>
            </div>
          </div>

          <div className="mini-stats">
            <p>People in split: {validPeopleCount ? peopleCount : 'Invalid'}</p>
            <p>Stored in state: expense list only</p>
            <p>Calculated live: total + per-person amount</p>
          </div>

          <div className="subtotals">
            <h3>Category subtotals</h3>
            {categoryTotals.length === 0 ? (
              <p className="subtle-text">Category totals will appear after you add expenses.</p>
            ) : (
              categoryTotals.map((item) => (
                <div className="subtotal-row" key={item.category}>
                  <span>{item.category}</span>
                  <strong>{formatCurrency(item.total)}</strong>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
