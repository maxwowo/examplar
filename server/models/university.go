package models

import (
	"github.com/maxwowo/examplar/database"
	"github.com/maxwowo/examplar/packages/skylar"
)

type University struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Domain string `json:"domain"`
}

func (u University) SearchByName(name string) ([]University, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT * FROM universities
		WHERE name ILIKE $1
		LIMIT 5
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(skylar.LikePad(name))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	universities := make([]University, 0)

	for rows.Next() {
		var row University

		err = rows.Scan(&row.ID, &row.Name, &row.Domain)
		if err != nil {
			return nil, err
		}

		universities = append(universities, row)
	}

	return universities, nil
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

func (u University) Get(ID int) (*University, error) {
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
