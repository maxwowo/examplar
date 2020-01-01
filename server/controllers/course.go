package controllers

import (
	"log"
	"net/http"

	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/responder"
)

type CourseController struct{}

var courseModel = new(models.Course)

// Searches for courses with matching course and university values
func (c CourseController) Search(w http.ResponseWriter, r *http.Request) {
	// Get query parameters
	query := r.URL.Query()

	course, courseOk := query["course"]
	university, universityOk := query["university"]

	// Malformed query parameters
	if !(courseOk && universityOk && len(course) == 1 && len(university) == 1) {
		errMsg := "Malformed course and/or university query parameters."
		responder.RespondError(w, http.StatusBadRequest, errMsg)
		return
	}

	// Get all rows with matching course and university values
	courses, err := courseModel.GetByCourseUniversity(course[0], university[0])
	if err != nil {
		log.Panic(err)
	}

	// Send response
	responder.RespondData(w, struct {
		Courses []models.Course `json:"courses"`
	}{
		Courses: courses,
	})
}
