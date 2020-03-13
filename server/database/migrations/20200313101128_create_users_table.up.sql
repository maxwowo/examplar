CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(100) NOT NULL,
    password   VARCHAR(100) NOT NULL,
    created_at DATE         NOT NULL,
    updated_at DATE         NOT NULL
);
