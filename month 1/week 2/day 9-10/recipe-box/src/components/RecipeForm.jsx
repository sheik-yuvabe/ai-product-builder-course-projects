function RecipeForm({ formData, formError, onChange, onSubmit }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="section-label">Add Recipe</p>
        <h2>Build your personal box</h2>
      </div>

      <form className="recipe-form" onSubmit={onSubmit}>
        <label>
          Recipe title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Example: Veg Fried Rice"
          />
        </label>

        <label>
          Category
          <select name="category" value={formData.category} onChange={onChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </label>

        <label>
          Cooking time in minutes
          <input
            type="number"
            min="1"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={onChange}
            placeholder="20"
          />
        </label>

        <label>
          Ingredients
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={onChange}
            rows="4"
            placeholder="rice, carrot, beans, soy sauce"
          />
        </label>

        {formError ? <p className="form-error">{formError}</p> : null}

        <button type="submit" className="primary-button">
          Save Recipe
        </button>
      </form>
    </section>
  )
}

export default RecipeForm
