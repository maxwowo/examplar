package server

import (
	"log"
	"net/http"

	"github.com/maxwowo/examplar/configuration"
)

func Initialize() {
	router := NewRouter()

	config := configuration.GetConfig()

	address := config.GetString("server.address")

	log.Printf("Starting server on %s", address)

	err := http.ListenAndServe(address, router)
	if err != nil {
		panic(err)
	}
}
