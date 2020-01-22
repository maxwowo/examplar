package controllers

import (
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/responder"
	"log"
	"net/http"
)

type UniversityController struct{}

var universityModel = new(models.University)

func (u UniversityController) Search(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()

	name := query.Get("name")

	universities, err := universityModel.GetByName(name)
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, struct {
		Universities []models.University `json:"universities"`
		Query        string              `json:"query"`
	}{
		Universities: universities,
		Query:        name,
	})
}
