# Recipe Box Log

## Project Info

- Week: 2
- Days: 9-10
- Project: Recipe Box
- Stage: Integration task

## Main Concepts For This Project

- Larger component tree
- Controlled form inputs
- Add recipe flow
- List rendering with `map()`
- Category filtering
- Favorite toggle
- Search and derived filtering
- `useEffect`
- `localStorage`
- Load initial state
- Persist updates
- Reset flow

## Implementation Steps

- [x] Identified this as the Week 2 Day 9-10 frontend project from the phase guide.
- [x] Created the project folder at `month 1/week 2/day 9-10/recipe-box`.
- [x] Added this `project-log.md` file to track implementation.
- [x] Created a new React + Vite app inside this folder.
- [x] Installed dependencies with `npm install`.
- [x] Started the dev server briefly to verify the project can launch locally.
- [x] Replaced the starter screen in `src/App.jsx` with a simple Recipe Box layout.
- [x] Added starter recipe data as an array of objects.
- [x] Created state for recipes, form fields, selected category, search text, and favorite filter.
- [x] Added a recipe form with controlled inputs for title, category, ingredients, and cooking time.
- [x] Added validation so empty recipes are not saved.
- [x] Added the submit logic to create a new recipe and add it into state immutably.
- [x] Showed recipe cards with `map()` and a proper `key`.
- [x] Added a favorite button to toggle one recipe's saved status.
- [x] Added a category dropdown filter.
- [x] Added a search input to filter recipes by title.
- [x] Created derived filtered results instead of storing a second filtered recipes state.
- [x] Used `useEffect` to load saved recipes from `localStorage` on first render.
- [x] Used `useEffect` to save recipes into `localStorage` whenever the recipes list changes.
- [x] Added a reset flow for clearing the form after submit.
- [x] Added an empty state when no recipes match the current filters.
- [x] Styled the app in `src/App.css` and `src/index.css` for desktop and mobile.
- [x] Ran `npm run build` to confirm the project works without errors.
- [ ] Update this log after each meaningful implementation step.

## Notes

- Mentor note: This project is still inside Week 2 scope, so we should use `useEffect` and `localStorage`, but not React Router or backend APIs.
- Mentor note: Keep filtered recipes as a derived value from state instead of storing them separately.
- Student note: Open `src/App.jsx` and focus first on `handleSubmit`, `handleToggleFavorite`, and the `filteredRecipes` logic.

## Latest Update

- Date: 2026-04-22
- Built the first full Recipe Box version with a recipe form, starter data, search, category filter, favorite toggle, empty state, and browser saving through `localStorage`.
- Added a small component structure with `RecipeForm`, `FilterBar`, and `RecipeList` so the app is easier to read and practice.
