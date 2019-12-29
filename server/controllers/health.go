package controllers

import (
	"log"
	"net/http"
)

type HealthController struct{}

func (healthController HealthController) Status(writer http.ResponseWriter, _ *http.Request) {
	writer.WriteHeader(http.StatusOK)

	if _, err := writer.Write([]byte("Healthy.")); err != nil {
		log.Fatalln(err)
	}
}
