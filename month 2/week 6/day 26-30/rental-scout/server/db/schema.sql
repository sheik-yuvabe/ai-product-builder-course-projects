DROP TABLE IF EXISTS listings;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  rent_amount INTEGER NOT NULL CHECK (rent_amount > 0),
  bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
  badge TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
