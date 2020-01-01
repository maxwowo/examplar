package server

import (
	"log"
	"net/http"

	"github.com/maxwowo/examplar/configuration"
)

func Initialize() {
	router := NewRouter()

	config := configuration.GetConfig()

	addr := config.GetString("server.address")

	log.Printf("Starting server on %s", addr)

	err := http.ListenAndServe(addr, router)
	if err != nil {
		log.Panic(err)
	}
}
