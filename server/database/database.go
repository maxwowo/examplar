package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"

	"github.com/maxwowo/examplar/configuration"
)

var db *sql.DB

func Initialize() {
	var err error

	config := configuration.GetConfig()

	connectionString := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%d sslmode=disable",
		config.GetString("database.user"),
		config.GetString("database.password"),
		config.GetString("database.name"),
		config.GetString("database.host"),
		config.GetInt("database.port"),
	)

	db, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Panic(err)
	}
}

func GetDatabase() *sql.DB {
	return db
}
