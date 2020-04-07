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

type ExamController struct{}

var examModel = new(models.Exam)

func (e ExamController) Context(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		examID := chi.URLParam(r, "examID")

		IntExamID, err := strconv.Atoi(examID)
		if err != nil {
			log.Panic(err)
		}

		exam, err := examModel.Get(IntExamID)
		if err != nil {
			responder.RespondError(w, "Exam ID does not exist.", http.StatusBadRequest)
			return
		}

		ctx := context.WithValue(r.Context(), "exam", exam)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (e ExamController) getContext(r *http.Request) *models.Exam {
	ctx := r.Context()

	exam, ok := ctx.Value("exam").(*models.Exam)
	if !ok {
		log.Panic("Could not read exam ID context value.")
	}

	return exam
}

func (e ExamController) Get(w http.ResponseWriter, r *http.Request) {
	responder.RespondData(w, struct {
		Exam models.Exam `json:"exam"`
	}{
		Exam: *e.getContext(r),
	})
}

func (e ExamController) Create(w http.ResponseWriter, r *http.Request) {
	var examPayload forms.CreateExam

	// Malformed JSON exam payload
	err := json.NewDecoder(r.Body).Decode(&examPayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create exam
	exam, err := examModel.Create(examPayload)
	if err != nil {
		responder.RespondError(w, "Invalid exam ID.", http.StatusBadRequest)
		return
	}

	responder.RespondData(w, struct {
		Exam models.Exam `json:"exam"`
	}{
		Exam: *exam,
	})
}

func (e ExamController) GetSolution(w http.ResponseWriter, r *http.Request) {
	exam := e.getContext(r)

	solution, err := solutionModel.SearchByExamID(exam.ID)
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, struct {
		Solution models.Solution `json:"solution"`
	}{
		Solution: *solution,
	})
}
