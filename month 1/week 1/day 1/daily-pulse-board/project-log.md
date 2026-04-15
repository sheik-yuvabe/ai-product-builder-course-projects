# Project Log

## Daily Pulse Board

Date: 2026-04-15

1. Identified the project as the Week 1 Day 1 frontend onboarding task.
2. Read the frontend phase guidance to stay inside the allowed concepts:
   React, Vite, JSX, components, props, `useState`, click handlers, dynamic classes, and conditional rendering.
3. Created a new Vite React project in the `daily-pulse-board` folder.
4. Installed the project dependencies with `npm install`.
5. Replaced the default Vite demo in `src/App.jsx` with the `Daily Pulse Board` UI.
6. Added a reusable `PulseCard` component in `src/components/PulseCard.jsx`.
7. Used `useState` in `src/App.jsx` to:
   store the selected pulse
   show or hide the coach tip
8. Added simple styling in `src/App.css` and `src/index.css`.
9. Verified the project with `npm run build`.
10. Confirmed the React app compiles into the `dist` folder without errors.

## Concepts Used

- JSX: writing UI with HTML-like syntax inside React
- Component: a small reusable UI block like `PulseCard`
- Props: values sent from `App` to `PulseCard`
- `useState`: stores data that can change on the screen
- Click handler: a function that runs when a button is clicked
- Dynamic class: class names that change based on state
- Conditional rendering: showing the coach tip only when `showTip` is `true`
