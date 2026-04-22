function RecipeList({ recipes, onToggleFavorite }) {
  if (recipes.length === 0) {
    return (
      <section className="empty-state">
        <h3>No recipes match this filter.</h3>
        <p>Try another search, another category, or add a new recipe.</p>
      </section>
    )
  }

  return (
    <section className="recipe-list">
      {recipes.map((recipe) => (
        <article key={recipe.id} className="recipe-card">
          <div className="recipe-card-top">
            <div>
              <span className="recipe-category">{recipe.category}</span>
              <h3>{recipe.title}</h3>
            </div>

            <button
              type="button"
              className={recipe.favorite ? 'favorite-button active' : 'favorite-button'}
              onClick={() => onToggleFavorite(recipe.id)}
            >
              {recipe.favorite ? 'Favorited' : 'Mark Favorite'}
            </button>
          </div>

          <p className="recipe-time">{recipe.cookingTime} minutes</p>

          <div className="ingredient-group">
            <p className="ingredient-title">Ingredients</p>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={`${recipe.id}-${ingredient}`}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  )
}

export default RecipeList
