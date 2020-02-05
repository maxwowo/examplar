package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/maxwowo/examplar/forms"
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/responder"
)

type CourseController struct{}

var courseModel = new(models.Course)

func (c CourseController) Create(w http.ResponseWriter, r *http.Request) {
	var coursePayload forms.CreateCourse

	// Malformed JSON course payload
	err := json.NewDecoder(r.Body).Decode(&coursePayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Invalid university ID
	universityExists, err := universityModel.ExistsID(coursePayload.UniversityID)
	if err != nil {
		log.Panic(err)
	}
	if !universityExists {
		responder.RespondError(w, "Invalid university ID.", http.StatusBadRequest)
		return
	}

	// Create course
	course, err := courseModel.Create(coursePayload)
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, struct {
		Course models.Course `json:"course"`
	}{
		Course: *course,
	})
}

// Searches for courses with matching course and university values
func (c CourseController) Search(w http.ResponseWriter, r *http.Request) {
	var courses []models.Course
	var err error

	query := r.URL.Query()

	course := query.Get("course")
	universityID := query.Get("universityId")

	if universityID != "" {
		universityID, err := strconv.Atoi(universityID)
		if err != nil {
			responder.RespondError(w, "Malformed university ID.", http.StatusBadRequest)
		}

		// Get all rows with matching course and universityID values
		courses, err = courseModel.GetByCourseUniversity(course, universityID)
		if err != nil {
			log.Panic(err)
		}
	} else {
		courses, err = courseModel.GetByCourse(course)
		if err != nil {
			log.Panic(err)
		}
	}

	// Send response
	responder.RespondData(w, struct {
		Courses []models.Course `json:"courses"`
	}{
		Courses: courses,
	})
}
