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

---

# Listing Manager Database Log

## Database Project Info

- Week: 6
- Day: 26
- Project: Listing Manager with Database
- Stage: Onboarding task

## Database Concepts Practiced

- Why in-memory arrays are temporary
- Table planning
- Rows and columns
- Primary key
- Basic column types
- Seed data

## Database Implementation Log

- [x] Planned the first PostgreSQL-backed model for rental listings.
- [x] Created `server/db/schema.sql` with a `listings` table.
- [x] Added an auto-generated `id` primary key for each listing.
- [x] Stored `rent_amount` and `bedrooms` as numbers so they can be filtered and sorted later.
- [x] Created `server/db/seed.sql` with the current sample rental listings.

## Database Notes

- Day 26 status: first schema and seed files are ready.
- PostgreSQL was not connected to Express yet. That belongs to the next checkpoint.
- `psql` is not available in this terminal, so the SQL files were created but not run here.

---

# PostgreSQL Connection Log

## Backend Database Project Info

- Week: 6
- Day: 27
- Project: Listing Manager with Database
- Stage: Early practice task

## Connection Concepts Practiced

- PostgreSQL driver package
- Database connection pool
- SQL `SELECT`
- Async route handler
- Keeping API response shape stable for React

## Connection Implementation Log

- [x] Installed the `pg` package.
- [x] Installed the `dotenv` package.
- [x] Created `server/db/pool.js` for the PostgreSQL connection settings.
- [x] Created `server/db/listings.js` for listing database queries.
- [x] Added `.env.example` for local PostgreSQL settings.
- [x] Added `.env` to `.gitignore` so the real database password stays private.
- [x] Updated `GET /api/listings` to read listing rows from PostgreSQL.
- [x] Updated `GET /api/listings/:id` to read one listing row from PostgreSQL.
- [x] Formatted database rows into the same JSON shape the frontend already expects.

## Connection Notes

- The Express backend now expects the database name `rental_scout`.
- If PostgreSQL asks for a password, set `PGPASSWORD` in the terminal before running the server.
- Inquiry submission still uses temporary in-memory data. Moving writes into PostgreSQL is a later checkpoint.
- Verification: `npm run lint` passed and the frontend build passed.
- Verification gap: `npm run db:check` now reads `.env`, but it failed because the PostgreSQL password value is not the real local password yet.

---

# Inquiry Database Log

## Backend Database Project Info

- Week: 6
- Day: 28
- Project: Listing Manager with Database
- Stage: Early practice task

## Inquiry Concepts Practiced

- Creating a second database table
- Saving form data into PostgreSQL
- SQL `INSERT`
- `RETURNING` inserted rows
- Async POST route handler
- Keeping backend validation before database writes

## Inquiry Implementation Log

- [x] Created `server/db/inquiries-schema.sql` for the `inquiries` table.
- [x] Added `server/db/setup-inquiries.js` to create the table from the project.
- [x] Added `server/db/inquiries.js` for inquiry database queries.
- [x] Updated `POST /api/inquiries` to insert form submissions into PostgreSQL.
- [x] Updated `GET /api/inquiries` to read saved inquiries from PostgreSQL.
- [x] Kept listing validation before saving an inquiry.

## Inquiry Verification

- [x] Ran `npm run db:setup-inquiries` and created the `inquiries` table.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Posted one test inquiry through the API and read it back from PostgreSQL.
- [x] Submitted an inquiry from the React app and confirmed it saved successfully.
- [x] Confirmed Week 6 Day 28 form-to-database checkpoint is complete.

## Next Checkpoint

- Week 6 Day 29: practice update and delete with PostgreSQL.
- First small step: add one delete route for saved inquiry records.

---

# Inquiry Delete Log

## Backend Database Project Info

- Week: 6
- Day: 29
- Project: Listing Manager with Database
- Stage: Early practice task

## Delete Concepts Practiced

- SQL `DELETE`
- Route params for record IDs
- Returning the deleted row
- `404` response when a row does not exist
- Testing a write route without changing the React UI first

## Delete Implementation Log

- [x] Added `deleteInquiryById` in `server/db/inquiries.js`.
- [x] Added `DELETE /api/inquiries/:id` in `server/index.js`.
- [x] Made the backend port configurable with `process.env.PORT || 4000` for safer route testing.

## Delete Verification

- [x] Ran `npm run lint`.
- [x] Created one temporary inquiry through the API.
- [x] Deleted that same temporary inquiry through `DELETE /api/inquiries/:id`.
- [x] Confirmed the delete route returned `Inquiry deleted.`

---

# Inquiry Update Log

## Backend Database Project Info

- Week: 6
- Day: 29
- Project: Listing Manager with Database
- Stage: Early practice task

## Update Concepts Practiced

- SQL `UPDATE`
- Editing an existing database row
- `PATCH` route for partial resource changes
- Route params for selecting one row
- Backend validation before update
- Returning the updated row

## Update Implementation Log

- [x] Added `hasMissingInquiryUpdateFields` in `server/helpers.js`.
- [x] Added `updateInquiryById` in `server/db/inquiries.js`.
- [x] Added `PATCH /api/inquiries/:id` in `server/index.js`.

## Update Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Created one temporary inquiry through the API.
- [x] Updated that inquiry through `PATCH /api/inquiries/:id`.
- [x] Confirmed the update route returned `Inquiry updated.`

---

# Inquiry Manager Screen Log

## Backend Database Project Info

- Week: 6
- Day: 30
- Project: Listing Manager with Database
- Stage: Integration task

## Integration Concepts Practiced

- Fetching database records into React
- Admin-style read screen
- Loading state
- Empty state
- API connection error state
- Rendering saved PostgreSQL records

## Integration Implementation Log

- [x] Added an `InquiriesPage` in `src/App.jsx`.
- [x] Added `/inquiries` route in React Router.
- [x] Added an `Inquiries` navigation link.
- [x] Fetched `GET /api/inquiries` from the React page.
- [x] Rendered saved inquiry records from PostgreSQL.
- [x] Added basic inquiry list styling in `src/App.css`.

## Integration Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Inquiry Manager Delete UI Log

## Backend Database Project Info

- Week: 6
- Day: 30
- Project: Listing Manager with Database
- Stage: Integration task

## Delete UI Concepts Practiced

- Calling a `DELETE` API route from React
- Removing a deleted row from local state
- Button disabled state during a request
- UI error state for failed delete requests

## Delete UI Implementation Log

- [x] Added delete state to `InquiriesPage`.
- [x] Added a `Delete inquiry` button for each inquiry record.
- [x] Connected the button to `DELETE /api/inquiries/:id`.
- [x] Removed the deleted inquiry from the visible list after success.
- [x] Added delete button styling in `src/App.css`.

## Delete UI Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Inquiry Manager Edit UI Log

## Backend Database Project Info

- Week: 6
- Day: 30
- Project: Listing Manager with Database
- Stage: Integration task

## Edit UI Concepts Practiced

- Inline edit form
- Controlled inputs for editing existing data
- Calling a `PATCH` API route from React
- Updating local state after a successful database update
- Cancel edit state

## Edit UI Implementation Log

- [x] Added edit state to `InquiriesPage`.
- [x] Added an `Edit inquiry` button for each inquiry record.
- [x] Added an inline edit form for one selected inquiry at a time.
- [x] Connected the form to `PATCH /api/inquiries/:id`.
- [x] Updated the visible inquiry row after the API returns the updated record.
- [x] Added a cancel edit button.

## Edit UI Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Edited an inquiry from the React inquiry manager.
- [x] Refreshed the page and confirmed the updated value stayed in PostgreSQL.
- [x] Confirmed Week 6 Day 30 inquiry manager CRUD checkpoint is complete.

---

# Week 6 Cleanup Log

## Cleanup Project Info

- Week: 6
- Day: 30
- Project: Listing Manager with Database
- Stage: Integration cleanup

## Cleanup Concepts Practiced

- Removing unused temporary code
- Keeping the backend source of truth in PostgreSQL
- Verifying after cleanup

## Cleanup Implementation Log

- [x] Removed the old `server/data.js` in-memory listing and inquiry arrays.
- [x] Removed old unused in-memory helper functions from `server/helpers.js`.
- [x] Kept only the validation helpers that current routes still use.

## Cleanup Verification

- [x] Ran `npm run db:check` and confirmed the `rental_scout` database connection works.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Searched for old in-memory backend references and found no active usages.
