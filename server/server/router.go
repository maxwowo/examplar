package server

import (
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/maxwowo/examplar/controllers"
)

func NewRouter() *chi.Mux {
	router := chi.NewRouter()

	// Base middleware packages
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	// Request timeout middleware
	router.Use(middleware.Timeout(60 * time.Second))

	// Initializing all controllers
	health := new(controllers.HealthController)
	course := new(controllers.CourseController)

	// Check server health
	router.Get("/health", health.Status)

	// Courses search
	router.Get("/courses", course.Search)

	// Add course
	router.Post("/courses", course.Create)

	return router
}
