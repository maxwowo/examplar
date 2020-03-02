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

func (e Exam) GetByCourseID(courseID int) ([]Exam, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT id, exam_year, exam_term, course_id
		FROM exams
		WHERE course_id = $1
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(courseID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var exams = make([]Exam, 0)

	for rows.Next() {
		var exam Exam

		err := rows.Scan(&exam.ID, &exam.ExamYear, &exam.ExamTerm, &exam.CourseID)
		if err != nil {
			return nil, err
		}

		exams = append(exams, exam)
	}

	return exams, nil
}
