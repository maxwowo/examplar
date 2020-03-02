package server

import (
	"github.com/go-chi/cors"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/jwtauth"
	"github.com/maxwowo/examplar/controllers"
	"github.com/maxwowo/examplar/middlewares"
)

var tokenAuth *jwtauth.JWTAuth

func init() {
	tokenAuth = jwtauth.New("HS256", []byte("secret"), nil)

	// Print sample JWT token for debugging purposes
	_, tokenString, _ := tokenAuth.Encode(jwt.MapClaims{"user_id": 123})
	log.Printf("DEBUG: a sample jwt is %s\n\n", tokenString)
}

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
	notFound := new(controllers.NotFoundController)

	// All routes
	router.Get("/health", health.Status)

	// Protected routes
	router.Group(func(router chi.Router) {
		// Seek, verify and validate JWT tokens
		router.Use(jwtauth.Verifier(tokenAuth))

		// Handle valid / invalid tokens
		router.Use(middlewares.Authenticator)
	})

	router.Route("/courses", func(router chi.Router) {
		router.Get("/", course.Search)
		router.Post("/", course.Create)

		router.Route("/{courseID}", func(router chi.Router) {
			router.Use(course.Context)

			router.Get("/", course.Get)
		})
	})

	router.Route("/exams", func(router chi.Router) {
		router.Post("/", exam.Create)

		router.Route("/{examID}", func(router chi.Router) {
			router.Use(exam.Context)

			router.Get("/", course.Get)
		})
	})

	router.Route("/universities", func(router chi.Router) {
		router.Get("/", university.Search)

		router.Route("/{universityID}", func(router chi.Router) {
			router.Use(university.Context)

			router.Get("/", university.Get)
		})
	})

	router.NotFound(notFound.Handle)

	return router
}
