# Rental Scout Log

## Project Info

- Week: 4
- Days: 16-21
- Project: Rental Scout
- Stage: Capstone task

## Main Concepts For This Project

- React + Vite project setup
- Replacing starter code with app-specific UI
- Arrays of objects
- Rendering cards with `map()`
- Basic responsive CSS
- Shared state with `useState()`
- React Router basics
- `Routes`, `Route`, `NavLink`, and `Link`
- Route params with `useParams()`
- Find-by-id logic from local data
- Controlled inputs and form submission
- Confirmation state after submit

## Implementation Log

- [x] Created a new React + Vite app in `month 1/week 4/day 16-21/rental-scout`.
- [x] Installed project dependencies with `npm install`.
- [x] Replaced the default Vite starter in `src/App.jsx` with the first `Rental Scout` browse screen.
- [x] Added three sample apartment listings as local data and rendered them as cards.
- [x] Rewrote `src/App.css` and `src/index.css` to match the new browse layout on desktop and mobile.
- [x] Verified the first screen builds successfully with `npm run build`.
- [x] Wrapped the app with `BrowserRouter` in `src/main.jsx` to enable routing.
- [x] Added route setup in `src/App.jsx` for the browse page, saved page, and listing details page.
- [x] Added navigation links with `NavLink` so the user can move between `Browse` and `Saved`.
- [x] Added `View details` links on each listing card using `Link` and a dynamic listing id in the URL.
- [x] Verified the routing updates build successfully with `npm run build`.
- [x] Used `useParams()` in the listing details page to read the selected listing id from the URL.
- [x] Added find-by-id logic in `src/App.jsx` to show the correct apartment details from the local listings array.
- [x] Added a simple `Listing not found` fallback when the route id does not match any local listing.
- [x] Fixed the saved listings setup by moving `handleSaveListing` inside `App()` so it can use shared state correctly.
- [x] Added a real `Save listing` button in the browse cards and connected it to the shared `savedListings` state.
- [x] Updated the `Saved` page to show saved apartment cards and an empty-state message when nothing is saved.
- [x] Added an inquiry route and form flow for each listing using `/inquiry/:id`.
- [x] Added controlled form state and a submit confirmation message for the inquiry screen.
- [x] Connected inquiry entry points from the listing details page and saved listings page.
- [x] Improved the listing details screen with action buttons and a simple local-data note.
- [x] Completed the local-data capstone flow with browse, saved, listing details, and inquiry pages connected through React Router.

## Notes

- Mentor note: `project-log.md` now records completed implementation only.
- Mentor note: The app now supports browse, saved, details, and inquiry routes with real find-by-id behavior from local sample data.
- Mentor note: The current capstone now includes browse, saved, details, and inquiry flows using local state and local sample data.
- Mentor note: A real backend could later replace the local listings array and inquiry confirmation with persistent data and message delivery.
