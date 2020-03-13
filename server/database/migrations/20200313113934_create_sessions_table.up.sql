CREATE TABLE IF NOT EXISTS sessions
(
    id      SERIAL PRIMARY KEY,
    token   VARCHAR(100) NOT NULL,
    user_id INTEGER      NOT NULL REFERENCES users
);
