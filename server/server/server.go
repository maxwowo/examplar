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

	err := http.ListenAndServe(address, router)
	if err != nil {
		log.Fatal(err)
	}
}
