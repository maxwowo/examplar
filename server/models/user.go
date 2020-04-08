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

func (u User) Get(userID int) (*User, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT users.id, users.username, users.email, users.password, users.activated
		FROM users
		WHERE users.id = $1
	`)
	if err != nil {
		return nil, err
	}
	defer terminator.TerminateStatement(stmt)

	var user User

	err = stmt.QueryRow(userID).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Activated)

	return &user, err
}

func (u User) DeleteByInactiveEmail(email string) error {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		DELETE FROM users
		WHERE users.email = $1 AND users.activated = false
	`)
	if err != nil {
		return err
	}
	defer terminator.TerminateStatement(stmt)

	_, err = stmt.Query(email)
	if err != nil {
		return err
	}

	return nil
}

func (u User) SetActivated(userID int) (*User, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		UPDATE users 
		SET activated = true
		WHERE users.id = $1
		RETURNING users.id, users.username, users.email, users.password, users.activated
	`)
	if err != nil {
		return nil, err
	}
	defer terminator.TerminateStatement(stmt)

	var user User

	err = stmt.QueryRow(userID).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Activated)

	return &user, err
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
