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

---

# Rental Scout API Log

## Backend Project Info

- Week: 5
- Days: 21-25
- Project: Rental Scout API
- Stage: Completed Week 5 backend checkpoint

## Backend Concepts Practiced

- Express.js server setup
- API route
- Health route
- JSON response
- In-memory listing data
- Testing an API in the browser
- Route params
- Find one item by ID
- Simple 404 error response
- CORS basics
- `fetch()` from React
- Loading and error states
- Fetch one listing for a details page
- Fetch one listing for an inquiry page
- POST request from React
- `express.json()` request body parsing
- Simple backend validation
- Temporary in-memory inquiry data
- Helper functions
- Basic route organization
- API testing route

## Backend Implementation Log

- [x] Installed Express with `npm.cmd install express`.
- [x] Added a `server` script in `package.json` to run the backend with `node server/index.js`.
- [x] Created `server/index.js` for the Express backend.
- [x] Added `/api/health` to check if the backend is running.
- [x] Added `/api/listings` to return rental listing JSON.
- [x] Tested `/api/health` and confirmed the server returns a status message.
- [x] Tested `/api/listings` and confirmed the server returns rental listings as JSON.
- [x] Added one more listing object to practice changing backend data.
- [x] Verified the React frontend still builds with `npm.cmd run build`.
- [x] Added `/api/listings/:id` to return one rental listing by ID.
- [x] Used `request.params.id` and `Number()` to read the ID from the URL.
- [x] Added a `404` JSON response when no listing matches the ID.
- [x] Tested `/api/listings/1` and confirmed it returns one listing.
- [x] Tested `/api/listings/999` and confirmed it returns `{"message":"Listing not found"}`.
- [x] Installed `cors` so the React frontend can request data from the Express backend.
- [x] Added `app.use(cors())` in `server/index.js`.
- [x] Replaced the Browse page listing source with data fetched from `http://localhost:4000/api/listings`.
- [x] Added loading and API connection error messages for the Browse page.
- [x] Verified the frontend builds with `npm.cmd run build`.
- [x] Verified the code passes lint with `npm.cmd run lint`.
- [x] Updated the listing details page to fetch one listing from `/api/listings/:id`.
- [x] Added loading and not-found states for the listing details page.
- [x] Tested `/api/listings/4` and confirmed it returns the added `Sunrise House` listing.
- [x] Opened `/listings/4` in the browser and confirmed the details page shows `Sunrise House`.
- [x] Updated the inquiry page to fetch its listing summary from `/api/listings/:id`.
- [x] Added loading and not-found states for the inquiry page.
- [x] Removed the old local frontend `listings` array from `src/App.jsx`.
- [x] Verified the app still passes `npm.cmd run lint` and `npm.cmd run build`.
- [x] Added `express.json()` so Express can read JSON request bodies.
- [x] Added temporary in-memory `inquiries` data in `server/index.js`.
- [x] Added `POST /api/inquiries` to receive inquiry form submissions.
- [x] Added simple backend validation for missing inquiry fields.
- [x] Updated the inquiry form to send data to `POST /api/inquiries`.
- [x] Added submit loading and submit error states for the inquiry form.
- [x] Tested a valid inquiry and confirmed the backend returns status `201`.
- [x] Tested a missing-field inquiry and confirmed the backend returns status `400`.
- [x] Moved backend sample arrays into `server/data.js`.
- [x] Added backend helper functions in `server/helpers.js`.
- [x] Updated `server/index.js` to use `findListingById`, `hasMissingInquiryFields`, and `createInquiry`.
- [x] Added `GET /api/inquiries` so submitted inquiries can be checked during API testing.
- [x] Verified `/api/health`, `/api/listings`, `/api/listings/4`, `POST /api/inquiries`, and `GET /api/inquiries` after cleanup.
- [x] Reviewed the full frontend-backend inquiry flow from React form submit to Express validation and JSON response.
- [x] Confirmed Week 5 is complete for the Rental Scout API checkpoint.

## Backend Notes

- The backend runs on `http://localhost:4000`.
- The main JSON route is `http://localhost:4000/api/listings`.
- The listing data is still temporary in-memory data. It will reset when the code changes or the server restarts.
- Week 5 status: Complete.
- Next small checkpoint: start Week 6 database basics and plan the first PostgreSQL tables.
