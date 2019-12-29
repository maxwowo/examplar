package server

import (
	"fmt"
	"github.com/maxwowo/examplar/configuration"
	"log"
	"net/http"
)

func Init() {
	config := configuration.GetConfig()

	router := NewRouter()

	address := fmt.Sprintf(":%s", config.GetString("server.port"))

	if err := http.ListenAndServe(address, router); err != nil {
		log.Fatalln("Server closed unexpectedly.")
	}
}
