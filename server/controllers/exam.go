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
