package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/maxwowo/examplar/forms"
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/responder"
)

type CourseController struct{}

var courseModel = new(models.Course)

func (c CourseController) Create(w http.ResponseWriter, r *http.Request) {
	var coursePayload forms.CreateCourse

	err := json.NewDecoder(r.Body).Decode(&coursePayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
	}

	course, err := courseModel.Create(coursePayload)
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, course)
}

// Searches for courses with matching course and university values
func (c CourseController) Search(w http.ResponseWriter, r *http.Request) {
	// Get query parameters
	query := r.URL.Query()

	course, courseOk := query["course"]
	university, universityOk := query["university"]

	// Malformed query parameters
	if !(courseOk && universityOk && len(course) == 1 && len(university) == 1) {
		errMsg := "Malformed course and/or university query parameters."
		responder.RespondError(w, errMsg, http.StatusBadRequest)
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