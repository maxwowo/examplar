CREATE TABLE IF NOT EXISTS universities
(
    id     SERIAL PRIMARY KEY,
    name   VARCHAR(500) NOT NULL,
    domain VARCHAR(50)  NOT NULL
);
