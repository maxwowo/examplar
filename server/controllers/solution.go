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

type SolutionController struct{}

var solutionModel = new(models.Solution)

func (s SolutionController) Context(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		solutionID := chi.URLParam(r, "solutionID")

		IntSolutionID, err := strconv.Atoi(solutionID)
		if err != nil {
			log.Panic(err)
		}

		solution, err := solutionModel.Get(IntSolutionID)
		if err != nil {
			responder.RespondError(w, "Solution ID does not exist.", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), "solution", solution)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
