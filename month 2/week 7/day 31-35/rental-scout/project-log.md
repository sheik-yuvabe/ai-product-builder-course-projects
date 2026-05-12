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

---

# Signup Auth Log

## Auth Project Info

- Week: 7
- Day: 31
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Onboarding task

## Signup Concepts Practiced

- Users table
- Signup route
- Password hashing
- Unique email validation
- Keeping password data out of API responses

## Signup Implementation Log

- [x] Created `server/db/users-schema.sql` for the `users` table.
- [x] Added `server/db/setup-users.js` to create the users table.
- [x] Added `server/db/users.js` for user database queries.
- [x] Added `server/auth.js` for password hashing with Node crypto.
- [x] Added `hasMissingSignupFields` validation in `server/helpers.js`.
- [x] Added `POST /api/signup` in `server/index.js`.
- [x] Added `db:setup-users` script in `package.json`.

## Signup Verification

- [x] Ran `npm run db:setup-users`.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Posted a test signup to `POST /api/signup`.
- [x] Confirmed the API returned `Signup successful.` without returning the password hash.

---

# Login Auth Log

## Auth Project Info

- Week: 7
- Day: 31
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Onboarding task

## Login Concepts Practiced

- Finding a user by email
- Comparing a typed password with a stored password hash
- Returning `401` for invalid login
- Keeping the password hash inside the backend only

## Login Implementation Log

- [x] Added `verifyPassword` in `server/auth.js`.
- [x] Added `findUserByEmail` in `server/db/users.js`.
- [x] Added `hasMissingLoginFields` in `server/helpers.js`.
- [x] Added `POST /api/login` in `server/index.js`.

## Login Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Created one test user through `POST /api/signup`.
- [x] Logged in with the correct password and confirmed `Login successful.`
- [x] Tried a wrong password and confirmed the API returned `401`.

---

# Auth Forms Log

## Auth Project Info

- Week: 7
- Day: 31
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Onboarding task

## Auth UI Concepts Practiced

- Signup form
- Login form
- Controlled inputs
- Calling auth API routes from React
- Success and error states

## Auth UI Implementation Log

- [x] Added `SignupPage` in `src/App.jsx`.
- [x] Added `LoginPage` in `src/App.jsx`.
- [x] Added `/signup` and `/login` routes.
- [x] Added Signup and Login navigation links.
- [x] Connected signup form to `POST /api/signup`.
- [x] Connected login form to `POST /api/login`.
- [x] Added success message styling in `src/App.css`.

## Auth UI Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Auth State Log

## Auth Project Info

- Week: 7
- Day: 32
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## Auth State Concepts Practiced

- `currentUser` state
- Updating React state after signup and login
- Conditional navigation
- Logout by clearing user state
- UI changing based on whether a user is logged in

## Auth State Implementation Log

- [x] Added `currentUser` state in `App`.
- [x] Added `handleAuthSuccess` to store the logged-in user.
- [x] Added `handleLogout` to clear the logged-in user.
- [x] Passed auth state into pages that render navigation.
- [x] Updated Signup and Login pages to set `currentUser` after success.
- [x] Updated navigation to show Signup/Login when logged out.
- [x] Updated navigation to show the user name and Logout when logged in.
- [x] Added small nav styles for the username and logout button.

## Auth State Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Protected Inquiries Page Log

## Auth Project Info

- Week: 7
- Day: 32
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## Protected Route Concepts Practiced

- Checking `currentUser` before showing a page
- Showing a login-required screen when logged out
- Loading private/admin-like data only after login
- Keeping this protection frontend-only for the first checkpoint

## Protected Route Implementation Log

- [x] Updated `InquiriesPage` to check `currentUser`.
- [x] Added a login-required screen for logged-out users.
- [x] Added links to Login and Signup from the protected page message.
- [x] Changed inquiry fetching so it only runs when `currentUser` exists.

## Protected Route Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Saved Listings Table Log

## Auth Project Info

- Week: 7
- Day: 33
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## User-Owned Data Concepts Practiced

- User-owned records
- `user_id` as the owner of a row
- `listing_id` as the saved item
- Foreign keys to connect tables
- Preventing duplicate saves for the same user and listing

## Saved Listings Table Implementation Log

- [x] Created `server/db/saved-listings-schema.sql`.
- [x] Added `saved_listings` table with `user_id`, `listing_id`, and `created_at`.
- [x] Added foreign key from `saved_listings.user_id` to `users.id`.
- [x] Added foreign key from `saved_listings.listing_id` to `listings.id`.
- [x] Added `UNIQUE (user_id, listing_id)` to prevent duplicate saved listings.
- [x] Added `server/db/setup-saved-listings.js`.
- [x] Added `db:setup-saved-listings` script.

## Saved Listings Table Verification

- [x] Ran `npm run db:setup-saved-listings`.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Saved Listings API Log

## Auth Project Info

- Week: 7
- Day: 33
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## User-Owned API Concepts Practiced

- Creating a user-owned saved listing row
- Reading saved listings for one user
- Deleting one saved listing row
- Joining saved listing records with listing details
- Handling duplicate saved listings with `409`

## Saved Listings API Implementation Log

- [x] Created `server/db/saved-listings.js`.
- [x] Added `getSavedListingsByUserId`.
- [x] Added `createSavedListing`.
- [x] Added `deleteSavedListingById`.
- [x] Added `hasMissingSavedListingFields` validation.
- [x] Added `GET /api/saved-listings?userId=...`.
- [x] Added `POST /api/saved-listings`.
- [x] Added `DELETE /api/saved-listings/:id`.

## Saved Listings API Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Created a test user through the signup API.
- [x] Saved listing `1` for that user.
- [x] Fetched saved listings for that user.
- [x] Deleted the saved listing record.

---

# Saved Listings Frontend Log

## Auth Project Info

- Week: 7
- Day: 33
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## User-Owned Frontend Concepts Practiced

- Saving data for the logged-in user
- Calling `POST /api/saved-listings` from React
- Loading saved rows for the current user
- Using `currentUser.id` as the owner ID
- Showing an error when a logged-out user tries to save

## Saved Listings Frontend Implementation Log

- [x] Updated the browse save button to call the saved-listings API.
- [x] Added save error state on the browse page.
- [x] Loaded saved listings from `GET /api/saved-listings?userId=...` after login/signup.
- [x] Updated saved-listing checks to use `listingId` from the database row.
- [x] Updated saved page links to use the real listing ID.
- [x] Cleared saved listings on logout.

## Saved Listings Frontend Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Remove Saved Listing UI Log

## Auth Project Info

- Week: 7
- Day: 33
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## Remove Saved Listing Concepts Practiced

- Deleting a user-owned row from React
- Using saved row `id` for delete
- Updating React state after backend delete
- Clearing user-owned data on logout

## Remove Saved Listing Implementation Log

- [x] Added a `Remove` button to each saved listing card.
- [x] Connected the button to `DELETE /api/saved-listings/:id`.
- [x] Removed the deleted saved listing from React state after success.
- [x] Added remove error state for failed requests.
- [x] Cleared saved listings and save/remove errors on logout.

## Remove Saved Listing Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Saved Listing Ownership Check Log

## Auth Project Info

- Week: 7
- Day: 34
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## Ownership Concepts Practiced

- Ownership check before deleting user-owned data
- `401` for missing user identity
- `403` for trying to delete another user's row
- `404` for a missing saved listing row
- Passing `userId` with a delete request for this learning checkpoint

## Ownership Implementation Log

- [x] Added `findSavedListingById` in `server/db/saved-listings.js`.
- [x] Updated `deleteSavedListingById` to require both saved listing ID and user ID.
- [x] Updated `DELETE /api/saved-listings/:id` to require `userId`.
- [x] Added `401` response when `userId` is missing.
- [x] Added `403` response when the saved row belongs to a different user.
- [x] Updated the React remove request to send `userId` in the query string.

## Ownership Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Tested delete without `userId` and confirmed `401`.
- [x] Tested delete with another user's ID and confirmed `403`.
- [x] Tested delete with the owner user ID and confirmed success.

---

# Protected Saved Page Log

## Auth Project Info

- Week: 7
- Day: 34
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## Protected Saved Page Concepts Practiced

- Protecting user-owned frontend data
- Checking `currentUser` before showing saved listings
- Showing a login-required screen when logged out
- Keeping saved listing data tied to the logged-in user

## Protected Saved Page Implementation Log

- [x] Updated `SavedPage` to check `currentUser`.
- [x] Added a login-required screen for logged-out users.
- [x] Added Login and Signup links from the saved page guard.

## Protected Saved Page Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.

---

# Token Auth Saved Listings Log

## Auth Project Info

- Week: 7
- Day: 34
- Project: Private Saved Listings + Inquiry Dashboard
- Stage: Early practice task

## Token Auth Concepts Practiced

- Backend-created auth token after signup/login
- Sending token with `Authorization: Bearer <token>`
- Reading the current user from the token on the backend
- Avoiding trusted `userId` values from the browser
- Backend ownership checks for saved listings

## Token Auth Implementation Log

- [x] Added in-memory session token storage in `server/index.js`.
- [x] Added token creation after successful signup.
- [x] Added token creation after successful login.
- [x] Updated saved-listing API routes to read current user from the token.
- [x] Removed `userId` from saved-listing frontend requests.
- [x] Added `Authorization` headers for saved listing load, save, and remove requests.
- [x] Stored the auth token in React state after signup/login.
- [x] Cleared the auth token on logout.

## Token Auth Verification

- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Confirmed signup returns a token.
- [x] Confirmed saved-listings request without token returns `401`.
- [x] Confirmed another user's token returns `403` for delete.
- [x] Confirmed the owner's token can save, read, and delete saved listings.

## Token Auth Notes

- This token is stored in backend memory for learning.
- If the backend restarts, users need to login again.
- A production app would use persistent sessions or signed tokens.

## Week 7 Day 35 - Private Dashboard + Two-User Test

- Project: Private Saved Listings + Inquiry Dashboard
- Concept: private dashboard, multi-user testing, ownership checks

### Completed

- [x] Ran an API test with two separate users.
- [x] Confirmed User A and User B each see only their own saved listings.
- [x] Confirmed User B gets `403` when trying to delete User A's saved listing.
- [x] Added protected `/dashboard` route.
- [x] Added Dashboard nav link for logged-in users.
- [x] Dashboard shows current user info, saved listing count, and links to saved listings/inquiries.
- [x] Ran `npm run lint` successfully.
- [x] Ran `npm run build` successfully.

### Learning Note

A private page should not trust random user IDs from the browser. It should use the logged-in user's token, find the current user on the backend, and only return data owned by that user.
