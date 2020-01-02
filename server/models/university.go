package models

import "github.com/maxwowo/examplar/database"

type University struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Domain string `json:"domain"`
}

func (u University) GetByID(ID int) (*University, error) {
	var err error

	db := database.GetDatabase()

	query := `
		SELECT id, name, domain
		FROM universities 
		WHERE id = $1
	`

	stmt, err := db.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer func() {
		err = stmt.Close()
	}()

	var university University

	err = stmt.QueryRow(ID).Scan(&university.ID, &university.Name, &university.Domain)
	if err != nil {
		return nil, err
	}

	return &university, err
}
