package controllers

import (
	"log"
	"net/http"

	"github.com/maxwowo/examplar/models"
)

type CourseController struct{}

var courseModel = new(models.Course)

func (c CourseController) Search(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()

	course, courseOk := query["course"]
	university, universityOk := query["university"]

	if !(courseOk && universityOk && len(course) == 1 && len(university) == 1) {
		errMsg := "Malformed course and/or university query parameters."
		RespondError(w, http.StatusBadRequest, errMsg)
		return
	}

	courses, err := courseModel.GetByCourseUniversity(course[0], university[0])
	if err != nil {
		log.Panic(err)
	}

	RespondData(w, struct {
		Courses []models.Course `json:"courses"`
	}{
		Courses: courses,
	})
}
