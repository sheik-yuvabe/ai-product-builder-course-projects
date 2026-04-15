# Project Log

## Workshop RSVP + Ticket Preview

Date: 2026-04-15

1. Identified the project as the Week 1 Day 3 frontend early practice task.
2. Read the frontend phase guidance to stay inside the allowed concepts:
   controlled inputs, `onChange`, `onSubmit`, `preventDefault`, simple validation, success and error states, reset after submit, and live preview.
3. Created a new Vite React project in the `workshop-rsvp-ticket-preview` folder.
4. Installed the project dependencies with `npm install`.
5. Replaced the default Vite demo in `src/App.jsx` with a learning-focused workshop RSVP starter.
6. Added form state in `src/App.jsx` using one object with `useState`.
7. Connected each form field to state with `value` and `onChange`.
8. Added a live ticket preview panel that updates as the student types.
9. Added `onSubmit` and `preventDefault()` to prepare for validation without refreshing the page.
10. Added `error` state and validation for empty name and email fields.
11. Rendered an error message with conditional rendering when required fields are missing.
12. Added `successMessage` state to show a success message after a valid submit.
13. Reset the form back to `initialForm` after a successful RSVP.
14. Styled the page in `src/App.css` and `src/index.css` with a responsive two-column layout.

## Concepts Used

- Controlled input: an input whose value comes from React state
- `onChange`: event handler that updates state when the user types or selects
- State object: one object that stores related form values together
- Spread operator: copies the old state values before updating one field
- `onSubmit`: function that runs when the form is submitted
- `preventDefault()`: stops the browser's normal form refresh
- Live preview: showing the current state on screen before the final submit logic is finished
- Validation: checking whether required input values are empty before continuing
- Conditional rendering: showing error or success text only when that state has a value
- Success state: a piece of state used to show a positive submit result
- Reset flow: putting the form back to its starting values after a successful submit

## Next Steps

1. Add styles for `.error-message` and `.success-message` in `src/App.css`.
2. Decide whether `handleChange` should clear old messages when the user starts typing again.
3. Optionally change the button text from `Save RSVP Draft` to a final action like `Confirm RSVP`.
