package controllers

import (
	"github.com/maxwowo/examplar/packages/responder"
	"net/http"
)

type NotFoundController struct{}

func (n NotFoundController) Handle(w http.ResponseWriter, _ *http.Request) {
	status := http.StatusNotFound
	statusText := http.StatusText(status)

	responder.RespondError(w, statusText, status)
}
