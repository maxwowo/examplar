package controllers

import (
	"net/http"

	"github.com/maxwowo/examplar/tools/responder"
)

type HealthController struct{}

// Determines if the instance is healthy or not
func (h HealthController) Status(w http.ResponseWriter, _ *http.Request) {
	// Send response
	responder.RespondData(w, struct {
		Message string `json:"message"`
	}{
		Message: "Healthy.",
	})
}
