package controllers

import (
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/tools/responder"
	"log"
	"net/http"
)

type UniversityController struct{}

var universityModel = new(models.University)

func (u UniversityController) AllUniversities(w http.ResponseWriter, r *http.Request) {
	universities, err := universityModel.AllUniversities()
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, struct {
		Universities []models.University `json:"universities"`
	}{
		Universities: universities,
	})
}
