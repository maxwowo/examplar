package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/maxwowo/examplar/configuration"
)

func Init() {
	router := NewRouter()

	config := configuration.GetConfig()
	port := config.GetString("server.port")
	address := fmt.Sprintf(":%s", port)

	log.Println(fmt.Sprintf("Starting server on %s...", port))
	err := http.ListenAndServe(address, router)
	if err != nil {
		log.Fatal(err)
	}
}
