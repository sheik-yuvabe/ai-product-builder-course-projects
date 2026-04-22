import { useEffect, useState } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'

const STORAGE_KEY = 'recipe-box-saved-recipes'

const starterRecipes = [
  {
    id: 1,
    title: 'Masala Dosa',
    category: 'Breakfast',
    cookingTime: 35,
    ingredients: ['dosa batter', 'potato', 'onion', 'mustard seeds'],
    favorite: true,
  },
  {
    id: 2,
    title: 'Lemon Rice',
    category: 'Lunch',
    cookingTime: 20,
    ingredients: ['rice', 'lemon', 'peanuts', 'curry leaves'],
    favorite: false,
  },
  {
    id: 3,
    title: 'Paneer Wrap',
    category: 'Dinner',
    cookingTime: 25,
    ingredients: ['paneer', 'roti', 'capsicum', 'mint chutney'],
    favorite: false,
  },
]

const emptyForm = {
  title: '',
  category: 'Breakfast',
  cookingTime: '',
  ingredients: '',
}

function App() {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem(STORAGE_KEY)

    if (!savedRecipes) {
      return starterRecipes
    }

    try {
      const parsedRecipes = JSON.parse(savedRecipes)

      return Array.isArray(parsedRecipes) && parsedRecipes.length > 0
        ? parsedRecipes
        : starterRecipes
    } catch (error) {
      console.error('Could not load saved recipes.', error)
      return starterRecipes
    }
  })
  const [formData, setFormData] = useState(emptyForm)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = formData.title.trim()
    const ingredients = formData.ingredients
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const cookingTime = Number.parseInt(formData.cookingTime, 10)

    if (!title || !formData.category.trim() || ingredients.length === 0) {
      setFormError('Please fill title, category, and at least one ingredient.')
      return
    }

    if (Number.isNaN(cookingTime) || cookingTime <= 0) {
      setFormError('Cooking time should be a number greater than 0.')
      return
    }

    const newRecipe = {
      id: Date.now(),
      title,
      category: formData.category,
      cookingTime,
      ingredients,
      favorite: false,
    }

    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes])
    setFormData(emptyForm)
    setFormError('')
  }

  function handleToggleFavorite(recipeId) {
    setRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, favorite: !recipe.favorite }
          : recipe,
      ),
    )
  }

  function handleResetFilters() {
    setSelectedCategory('All')
    setSearchText('')
    setShowFavoritesOnly(false)
  }

  const categories = ['All', ...new Set(recipes.map((recipe) => recipe.category))]
  const normalizedSearch = searchText.trim().toLowerCase()

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'All' || recipe.category === selectedCategory
    const matchesSearch =
      normalizedSearch === '' ||
      recipe.title.toLowerCase().includes(normalizedSearch)
    const matchesFavorite = !showFavoritesOnly || recipe.favorite

    return matchesCategory && matchesSearch && matchesFavorite
  })

  const totalRecipes = recipes.length
  const favoriteRecipes = recipes.filter((recipe) => recipe.favorite).length
  const averageCookingTime =
    totalRecipes === 0
      ? 0
      : Math.round(
          recipes.reduce((total, recipe) => total + recipe.cookingTime, 0) /
            totalRecipes,
        )

  return (
    <div className="app-shell">
      <header className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Week 2 Project</p>
          <h1>Recipe Box</h1>
          <p className="hero-text">
            Save your favorite meal ideas, search them quickly, and keep them in
            the browser with local storage.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">Recipes</span>
            <strong>{totalRecipes}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Favorites</span>
            <strong>{favoriteRecipes}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg. Time</span>
            <strong>{averageCookingTime} min</strong>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <section className="left-panel">
          <RecipeForm
            formData={formData}
            formError={formError}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <section className="tip-card">
            <h2>How this app works</h2>
            <p>
              New recipes are stored in React state first. Then `useEffect`
              saves them into `localStorage` so they stay even after refresh.
            </p>
          </section>
        </section>

        <section className="right-panel">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            searchText={searchText}
            showFavoritesOnly={showFavoritesOnly}
            resultCount={filteredRecipes.length}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchText}
            onFavoritesToggle={() =>
              setShowFavoritesOnly((currentValue) => !currentValue)
            }
            onResetFilters={handleResetFilters}
          />

          <RecipeList
            recipes={filteredRecipes}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>
      </main>
    </div>
  )
}

export default App
