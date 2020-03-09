package controllers

import (
	"context"
	"encoding/json"
	"github.com/go-chi/chi"
	"github.com/maxwowo/examplar/forms"
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

func (s SolutionController) Get(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	solution, ok := ctx.Value("solution").(*models.Solution)
	if !ok {
		log.Panic("Could not read solution ID context value.")
	}

	responder.RespondData(w, struct {
		Solution models.Solution `json:"solution"`
	}{
		Solution: *solution,
	})
}

func (s SolutionController) Create(w http.ResponseWriter, r *http.Request) {
	var solutionPayload forms.CreateSolution

	// Malformed JSON solution payload
	err := json.NewDecoder(r.Body).Decode(&solutionPayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create solution
	solution, err := solutionModel.Create(solutionPayload)
	if err != nil {
		responder.RespondError(w, "Invalid solution ID.", http.StatusBadRequest)
		return
	}

	responder.RespondData(w, struct {
		Solution models.Solution `json:"solution"`
	}{
		Solution: *solution,
	})
}
