CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(100) NOT NULL,
    username   VARCHAR(100) NOT NULL,
    password   VARCHAR(100) NOT NULL,
    activated  BOOLEAN      NOT NULL,
    created_at DATE         NOT NULL,
    updated_at DATE         NOT NULL
);
