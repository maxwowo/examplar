CREATE TABLE IF NOT EXISTS registrations
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL
);
