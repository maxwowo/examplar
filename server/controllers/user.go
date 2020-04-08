package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/jwtauth"
	"github.com/maxwowo/examplar/forms"
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/mailer"
	"github.com/maxwowo/examplar/packages/responder"
	"github.com/maxwowo/examplar/packages/tokenizer"
	"log"
	"net/http"
)

type UserController struct{}

var userModel = new(models.User)

func (u UserController) Activate(w http.ResponseWriter, r *http.Request) {
	_, claims, err := jwtauth.FromContext(r.Context())
	if err != nil {
		log.Panic("Failed to retrieve claims during user activation.")
	}
	for key, val := range claims {
		fmt.Printf("Key: %v, value: %v\n", key, val)
	}
}

func (u UserController) Register(w http.ResponseWriter, r *http.Request) {
	var registerPayload forms.Register

	// Malformed JSON register payload
	err := json.NewDecoder(r.Body).Decode(&registerPayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if an activated user with same email already exists
	user, err := userModel.GetByEmail(registerPayload.Email, true)
	if err != nil {
		responder.RespondError(w, "Failed to check if activated user with same email already exists", http.StatusInternalServerError)
		return
	}

	if user != nil {
		responder.RespondError(w, "Email has already been taken.", http.StatusConflict)
		return
	}

	// Create user record
	user, err = userModel.Create(registerPayload)
	if err != nil {
		responder.RespondError(w, "Failed to register user.", http.StatusInternalServerError)
		return
	}

	// Send activation email to user
	mailer.SendActivationEmail(user)

	responder.RespondData(w, struct {
		Token string `json:"token"`
	}{
		Token: tokenizer.EncodeUserToken(user.ID),
	})
}
