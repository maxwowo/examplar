package models

import (
	"github.com/maxwowo/examplar/database"
	"github.com/maxwowo/examplar/forms"
)

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

func (s Solution) Create(solutionPaylaod forms.CreateSolution) (*Solution, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		INSERT INTO solutions
		(id, content, exam_id)
		VALUES
		(DEFAULT, $1, $2)
		RETURNING id, content, exam_id
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var solution Solution

	err = stmt.QueryRow(solutionPaylaod.Content, solutionPaylaod.ExamID).Scan(&solution.ID, &solution.Content, &solution.ExamID)

	return &solution, err
}
