package models

import "github.com/maxwowo/examplar/database"

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
