package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
)

func main() {
	const (
		host     = "localhost"
		port     = 5432
		user     = "examplar"
		password = "examplar"
		dbname   = "examplar"
	)

	connStr := fmt.Sprintf("user=%s password = %s dbname=%s host=%s port=%d sslmode=verify-full", user, password, dbname, host, port)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("SELECT name FROM users WHERE age = 12")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(rows)
}
