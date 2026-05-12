create table if not exists users (
  id serial primary key,
  name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamp not null default now()
);

create table if not exists listings (
  id serial primary key,
  title text not null,
  city text not null,
  monthly_rent integer not null check (monthly_rent > 0),
  description text not null,
  owner_id integer references users(id) on delete cascade,
  created_at timestamp not null default now(),
  unique (title, city)
);

insert into listings (title, city, monthly_rent, description)
values
  ('Sunny 1BHK near metro', 'Chennai', 14500, 'Good light, close to grocery stores and public transport.'),
  ('Shared apartment for students', 'Coimbatore', 8000, 'Budget-friendly shared home with Wi-Fi and water included.'),
  ('Compact studio for remote work', 'Bengaluru', 22000, 'Quiet studio with desk space, power backup, and fast internet.')
on conflict do nothing;
