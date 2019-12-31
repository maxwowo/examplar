package controllers

import (
	"net/http"
)

type HealthController struct{}

func (h HealthController) Status(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)

	_, err := w.Write([]byte("Healthy."))
	if err != nil {
		panic(err)
	}
}
