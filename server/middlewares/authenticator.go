package middlewares

import (
	"net/http"

	"github.com/go-chi/jwtauth"

	"github.com/maxwowo/examplar/tools/responder"
)

func Authenticator(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, _, err := jwtauth.FromContext(r.Context())

		if err != nil {
			responder.RespondError(w, err.Error(), http.StatusUnauthorized)
			return
		}

		if token == nil || !token.Valid {
			responder.RespondError(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			return
		}

		// Token is authenticated, pass it through
		next.ServeHTTP(w, r)
	})
}
