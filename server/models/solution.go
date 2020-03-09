package models

import "github.com/maxwowo/examplar/database"

type Solution struct {
	ID      int    `json:"id"`
	Content string `json:"content"`
	ExamID  int    `json:"examId"`
}

func (s Solution) Get(ID int) (*Solution, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT id, content, exam_id
		FROM solutions
		WHERE id = $1
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var solution Solution

	err = stmt.QueryRow(ID).Scan(&solution.ID, &solution.Content, &solution.ExamID)

	return &solution, err
}
