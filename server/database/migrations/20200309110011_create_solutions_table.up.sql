CREATE TABLE IF NOT EXISTS solutions
(
    id      SERIAL PRIMARY KEY,
    content TEXT    NOT NULL,
    exam_id INTEGER NOT NULL REFERENCES exams
);
