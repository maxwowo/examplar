package controllers

import (
	"log"
	"net/http"
)

type HealthController struct{}

func (healthController HealthController) Status(writer http.ResponseWriter) {
	writer.WriteHeader(http.StatusOK)

	if _, err := writer.Write([]byte("Working.")); err != nil {
		log.Fatalln(err)
	}
}
