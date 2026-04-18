# Weekend Budget Splitter Log

## Project Info

- Week: 2
- Day: 8
- Project: Weekend Budget Splitter
- Stage: Early practice task

## Main Concepts For This Project

- Controlled inputs
- Numeric input parsing
- Validation for empty and invalid values
- Arrays of objects in state
- Derived state vs stored state
- Totals and per-person split
- Number formatting
- Helper functions

## Implementation Log

- [x] Identified this as the Week 2 Day 8 frontend project from the phase guide.
- [x] Created a new React + Vite app in `month 1/week 2/day 8/weekend-budget-splitter`.
- [x] Installed dependencies with `npm install`.
- [x] Replaced the starter screen in `src/App.jsx` with a budget splitter UI.
- [x] Added state for weekend name, people count, expense form, and expense list.
- [x] Added controlled inputs for expense title, amount, category, and split count.
- [x] Added validation before letting a new expense enter the list.
- [x] Calculated total spent from the `expenses` array instead of storing a separate total state.
- [x] Calculated per-person split from `totalAmount / peopleCount`.
- [x] Added category subtotal display using a helper function.
- [x] Styled the app for desktop and mobile in `src/App.css` and `src/index.css`.
- [ ] Student task: Open `src/App.jsx` and find where text input becomes a number with `Number.parseFloat()` and `Number.parseInt()`.
- [ ] Student task: Change the starter data to match one real weekend plan you know.
- [ ] Student task: Add one more category option and check whether the subtotal section updates correctly.

## Notes

- Mentor note: Keep the total and split as derived values. Do not create extra state for them unless you truly need it.
- Student note: Update this file after each meaningful change so your learning steps stay visible.
