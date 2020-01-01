package controllers

import (
	"net/http"
)

type HealthController struct{}

func (h HealthController) Status(w http.ResponseWriter, _ *http.Request) {
	RespondData(w, struct {
		Message string `json:"message"`
	}{
		Message: "Healthy.",
	})
}
