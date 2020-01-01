package controllers

import (
	"net/http"
)

type HealthController struct{}

// Determines if the instance is healthy or not
func (h HealthController) Status(w http.ResponseWriter, _ *http.Request) {
	// Send response
	RespondData(w, struct {
		Message string `json:"message"`
	}{
		Message: "Healthy.",
	})
}
