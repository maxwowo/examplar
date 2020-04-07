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

func (s Solution) Create(solutionPayload forms.CreateSolution) (*Solution, error) {
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

	err = stmt.QueryRow(solutionPayload.Content, solutionPayload.ExamID).Scan(&solution.ID, &solution.Content, &solution.ExamID)

	return &solution, err
}

func (s Solution) Update(solution *Solution, solutionPayload forms.UpdateSolution) error {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		UPDATE solutions
		SET content = $2
		WHERE id = $1
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Query(solution.ID, solutionPayload.Content)

	return err
}

func (s Solution) CreateEmpty(examID int) error {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		INSERT INTO solutions
		(id, content, exam_id)
		VALUES
		(DEFAULT, '', $1)
		RETURNING id, content, exam_id
	`)
	if err != nil {
		return err
	}

	_, err = stmt.Query(examID)

	return err
}

func (s Solution) SearchByExamID(examID int) (*Solution, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT id, content, exam_id
		FROM solutions
		WHERE exam_id = $1
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var solution Solution

	err = stmt.QueryRow(examID).Scan(&solution.ID, &solution.Content, &solution.ExamID)

	return &solution, err
}
