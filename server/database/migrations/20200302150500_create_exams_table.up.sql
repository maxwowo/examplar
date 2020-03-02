CREATE TABLE IF NOT EXISTS exams
(
    id        SERIAL PRIMARY KEY,
    exam_year INTEGER NOT NULL,
    exam_term INTEGER NOT NULL,
    course_id INTEGER NOT NULL REFERENCES courses
);
