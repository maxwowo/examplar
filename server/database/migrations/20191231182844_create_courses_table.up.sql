CREATE TABLE IF NOT EXISTS courses
(
    id            SERIAL PRIMARY KEY,
    code          VARCHAR(50)  NOT NULL,
    name          VARCHAR(100) NOT NULL,
    university_id INTEGER      NOT NULL REFERENCES universities
);
