# Reading Queue Log

## Project Info

- Week: 2
- Days: 6-7
- Project: Reading Queue
- Stage: Early practice task

## Main Concepts For This Project

- Arrays of objects in state
- Add item flow
- Delete item flow
- Toggle status
- Edit flow
- Immutable updates with `map()`
- Filters
- Derived counts

## Implementation Steps

- [x] Created a new React + Vite app in `month 1/week 2/day 6-7/reading-queue`.
- [x] Installed dependencies with `npm install`.
- [x] Replaced the starter screen in `src/App.jsx` with a simple Reading Queue layout.
- [x] Added starter book data as an array of objects.
- [x] Created state for the reading queue list.
- [x] Added a form with controlled inputs for title, author, and status.
- [x] Added the logic to create a new book item and push it into state immutably.
- [x] Showed all books with `map()` and a proper `key`.
- [x] Added a delete button to remove one book from the list.
- [x] Added a toggle button to move a book through `To Read`, `Reading`, and `Finished`.
- [x] Added an edit flow so one saved book can be updated.
- [x] Added filter buttons to view books by status.
- [x] Added derived counts for total books, reading books, and finished books.
- [x] Improved the layout in `src/App.css` and `src/index.css` for desktop and mobile.
- [x] Run `npm run build` to make sure the project works without errors.
- [x] Updated this log after each meaningful implementation step.

## Notes

- Mentor note: The app uses local React state only, which matches the Week 2 scope.
- Mentor note: Counts are derived from the `books` array instead of being stored in separate state.
- Mentor note: Edit and toggle both use immutable array updates with `map()`.
- Student note: Open `src/App.jsx` and find `handleSubmit`, `handleToggleStatus`, and `handleEdit` to study the main logic.
