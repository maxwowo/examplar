package models

import (
	"github.com/maxwowo/examplar/database"
	"github.com/maxwowo/examplar/forms"
)

type Exam struct {
	ID       int `json:"id"`
	ExamYear int `json:"examYear"`
	ExamTerm int `json:"examTerm"`
	CourseID int `json:"courseId"`
}

func (e Exam) Get(ID int) (*Exam, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT id, exam_year, exam_term, course_id
		FROM exams
		WHERE id = $1
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var exam Exam

	err = stmt.QueryRow(ID).Scan(&exam.ID, &exam.ExamYear, &exam.ExamTerm, &exam.CourseID)

	return &exam, err
}

func (e Exam) Create(examPayload forms.CreateExam) (*Exam, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		INSERT INTO exams
		(id, exam_year, exam_term, course_id)
		VALUES
		(DEFAULT, $1, $2, $3)
		RETURNING id, exam_year, exam_term, course_id
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var exam Exam

	err = stmt.QueryRow(examPayload.ExamYear, examPayload.ExamTerm, examPayload.CourseID).Scan(&exam.ID, &exam.ExamYear, &exam.ExamTerm, &exam.CourseID)

	return &exam, err
}
