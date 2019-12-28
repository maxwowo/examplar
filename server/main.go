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

	connStr := fmt.Sprintf("user=%s password = %s dbname=%s host=%s port=%d sslmode=disable", user, password, dbname, host, port)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("SELECT * from public.university")
	if err != nil {
		log.Fatal(err)
	}

	var id int
	var name string
	rows.Next()
	if err := rows.Scan(&id, &name); err != nil {
		log.Fatal(err)
	}
	fmt.Println(id, name)
}
