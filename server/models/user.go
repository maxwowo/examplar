package models

import (
	"github.com/maxwowo/examplar/database"
	"github.com/maxwowo/examplar/forms"
	"github.com/maxwowo/examplar/packages/terminator"
)

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Activated bool   `json:"activated"`
}

func (u User) ExistsActivatedEmail(email string) (bool, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT COUNT(users.id)
		FROM users
		WHERE users.email = $1 AND users.activated = true
	`)
	if err != nil {
		return false, err
	}
	defer terminator.TerminateStatement(stmt)

	var count int

	err = stmt.QueryRow(email).Scan(&count)

	return count == 1, err
}

func (u User) Create(registerPayload forms.Register) (*User, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		INSERT INTO users
		(id, username, email, password, activated)
		VALUES 
		(DEFAULT, $1, $2, $3, false)
		RETURNING id, username, email, password, activated
	`)
	if err != nil {
		return nil, err
	}
	defer terminator.TerminateStatement(stmt)

	var user User

	err = stmt.QueryRow(registerPayload.Username, registerPayload.Email, registerPayload.Password).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Activated)

	return &user, err
}
