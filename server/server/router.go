package server

import (
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

	// Base middleware tools
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middlewares.Recoverer)

	// Request timeout middleware
	router.Use(middleware.Timeout(60 * time.Second))

	// Initializing all controllers
	health := new(controllers.HealthController)
	course := new(controllers.CourseController)
	university := new(controllers.UniversityController)

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
	})

	router.Route("/universities", func(router chi.Router) {
		router.Get("/", university.AllUniversities)
	})

	return router
}
