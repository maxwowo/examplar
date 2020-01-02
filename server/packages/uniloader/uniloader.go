package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"log"
	"os"

	"github.com/maxwowo/examplar/configuration"
	"github.com/maxwowo/examplar/database"
)

type university struct {
	WebPages      []string `json:"web_pages"`
	Name          string   `json:"name"`
	AlphaTwoCode  string   `json:"alpha_two_code"`
	StateProvince string   `json:"state-province"`
	Domains       []string `json:"domains"`
	Country       string   `json:"country"`
}

type universityDomains []university

func main() {
	environment := flag.String("e", "development", "The environment to run the script in.")

	flag.Parse()

	configuration.Initialize(*environment)
	database.Initialize()

	db := database.GetDatabase()

	log.Println("Opening university domains file...")

	file := openJSON()
	defer func() {
		err := file.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()

	log.Println("Reading university domains file...")

	var universities universityDomains
	decodeFile(file, &universities)

	log.Println("Inserting into database...")

	for _, university := range universities {
		insert(db, university)
	}

	log.Println("All complete!")
}

func decodeFile(file *os.File, universities *universityDomains) {
	err := json.NewDecoder(file).Decode(universities)
	if err != nil {
		log.Fatal(err)
	}
}

func openJSON() *os.File {
	file, err := os.Open("university_domains.json")
	if err != nil {
		log.Fatal(err)
	}
	return file
}

func insert(db *sql.DB, university university) {
	query := `
			INSERT INTO universities
			(id, name, domain)
			VALUES 
			(DEFAULT, $1, $2)
		`

	_, err := db.Exec(query, university.Name, university.Domains[0])
	if err != nil {
		log.Fatal(err)
	}
}
