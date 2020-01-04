package models

import "github.com/maxwowo/examplar/database"

type University struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Domain string `json:"domain"`
}

func (u University) ExistsID(ID int) (bool, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT EXISTS(SELECT 1 FROM universities WHERE id = $1)
	`)
	if err != nil {
		return false, err
	}
	defer stmt.Close()

	var exists bool

	err = stmt.QueryRow(ID).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (u University) GetByID(ID int) (*University, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT id, name, domain
		FROM universities 
		WHERE id = $1
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var university University

	err = stmt.QueryRow(ID).Scan(&university.ID, &university.Name, &university.Domain)
	if err != nil {
		return nil, err
	}

	return &university, err
}