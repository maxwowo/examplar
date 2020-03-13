package controllers

import (
	"context"
	"github.com/go-chi/chi"
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/responder"
	"log"
	"net/http"
	"strconv"
)

type UniversityController struct{}

var universityModel = new(models.University)

func (u UniversityController) Context(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		universityID := chi.URLParam(r, "universityID")

		IntUniversityID, err := strconv.Atoi(universityID)
		if err != nil {
			log.Panic(err)
		}

		university, err := universityModel.Get(IntUniversityID)
		if err != nil {
			responder.RespondError(w, "University ID does not exist.", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), "university", university)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (u UniversityController) getContext(r *http.Request) *models.University {
	ctx := r.Context()

	university, ok := ctx.Value("university").(*models.University)
	if !ok {
		log.Panic("Could not read university ID context value.")
	}

	return university
}

func (u UniversityController) Get(w http.ResponseWriter, r *http.Request) {
	responder.RespondData(w, struct {
		University models.University `json:"university"`
	}{
		University: *u.getContext(r),
	})
}

func (u UniversityController) Search(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()

	name := query.Get("name")

	universities, err := universityModel.SearchByName(name)
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
