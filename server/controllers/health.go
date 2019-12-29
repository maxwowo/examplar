package controllers

import (
	"log"
	"net/http"
)

type HealthController struct{}

func (healthController HealthController) Status(response http.ResponseWriter, _ *http.Request) {
	response.WriteHeader(http.StatusOK)

	_, err := response.Write([]byte("Healthy."))
	if err != nil {
		log.Fatal(err)
	}
}
