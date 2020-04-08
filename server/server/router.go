package server

import (
	"time"

	"github.com/go-chi/cors"

	"github.com/maxwowo/examplar/packages/tokenizer"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/jwtauth"

	"github.com/maxwowo/examplar/controllers"
	"github.com/maxwowo/examplar/middlewares"
)

func newRouter() *chi.Mux {
	router := chi.NewRouter()

	// Basic CORS
	corsConfig := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "DELETE", "PUT", "POST"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           400,
	})

	// Base middleware tools
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middlewares.Recoverer)
	router.Use(middlewares.ResponseContentType)
	router.Use(corsConfig.Handler)

	// Request timeout middleware
	router.Use(middleware.Timeout(60 * time.Second))

	// Initializing all controllers
	health := new(controllers.HealthController)
	course := new(controllers.CourseController)
	exam := new(controllers.ExamController)
	university := new(controllers.UniversityController)
	solution := new(controllers.SolutionController)
	user := new(controllers.UserController)
	notFound := new(controllers.NotFoundController)

	// All routes
	router.Get("/health", health.Status)

	// Protected routes
	router.Group(func(router chi.Router) {
		// Seek, verify and validate JWT tokens
		router.Use(jwtauth.Verifier(tokenizer.GetUserToken().TokenAuth))

		// Handle valid / invalid tokens
		router.Use(middlewares.Authenticator)
	})

	router.Route("/users", func(router chi.Router) {
		router.Group(func(router chi.Router) {
			// Seek, verify and validate JWT tokens
			router.Use(jwtauth.Verifier(tokenizer.GetActivationToken().TokenAuth))

			// Handle valid / invalid tokens
			router.Use(middlewares.Authenticator)

			router.Post("/activate", user.Activate)
		})

		router.Post("/", user.Register)
		router.Post("/login", user.Login)
	})

	router.Route("/courses", func(router chi.Router) {
		router.Get("/", course.Search)
		router.Post("/", course.Create)

		router.Route("/{courseID}", func(router chi.Router) {
			router.Use(course.Context)

			router.Get("/", course.Get)
			router.Get("/exams", course.GetExams)
		})
	})

	router.Route("/exams", func(router chi.Router) {
		router.Post("/", exam.Create)

		router.Route("/{examID}", func(router chi.Router) {
			router.Use(exam.Context)

			router.Get("/", exam.Get)
			router.Get("/solution", exam.GetSolution)
		})
	})

	router.Route("/universities", func(router chi.Router) {
		router.Get("/", university.Search)

		router.Route("/{universityID}", func(router chi.Router) {
			router.Use(university.Context)

			router.Get("/", university.Get)
		})
	})

	router.Route("/solutions/", func(router chi.Router) {
		router.Post("/", solution.Create)

		router.Route("/{solutionID}", func(router chi.Router) {
			router.Use(solution.Context)

			router.Get("/", solution.Get)
			router.Put("/", solution.Update)
		})
	})

	router.NotFound(notFound.Handle)

	return router
}
