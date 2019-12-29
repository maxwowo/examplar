package server

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/maxwowo/examplar/controllers"
	"time"
)

func NewRouter() *chi.Mux {
	router := chi.NewRouter()

	// Base middlewares
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	// Request timeout middleware
	router.Use(middleware.Timeout(60 * time.Second))

	health := new(controllers.HealthController)

	router.Get("/health", health.Status)

	return router
}
