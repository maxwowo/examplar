package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/go-chi/jwtauth"

	"github.com/maxwowo/examplar/forms"
	"github.com/maxwowo/examplar/models"
	"github.com/maxwowo/examplar/packages/mailer"
	"github.com/maxwowo/examplar/packages/responder"
	"github.com/maxwowo/examplar/packages/tokenizer"
)

type UserController struct{}

var userModel = new(models.User)

func (u UserController) Activate(w http.ResponseWriter, r *http.Request) {
	_, claims, err := jwtauth.FromContext(r.Context())
	if err != nil {
		log.Panic("Failed to retrieve claims during user activation.")
	}

	userID, ok := claims[tokenizer.GetActivationToken().TokenClaim].(float64)
	if !ok {
		responder.RespondError(w, "Malformed JWT.", http.StatusBadRequest)
		return
	}

	IntUserID := int(userID)

	user, err := userModel.SetActivated(IntUserID)
	if err != nil {
		log.Panic(err)
	}

	err = userModel.DeleteByInactiveEmail(user.Email)
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, struct{}{})
}

func (u UserController) Register(w http.ResponseWriter, r *http.Request) {
	var registerPayload forms.Register

	// Malformed JSON register payload
	err := json.NewDecoder(r.Body).Decode(&registerPayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if username already exists
	existsUsername, err := userModel.ExistsUsername(registerPayload.Username)
	if err != nil {
		log.Panic(err)
	}

	if existsUsername {
		responder.RespondError(w, "Username has already been taken.", http.StatusConflict)
		return
	}

	// Check if an activated user with same email already exists
	existsActivatedEmail, err := userModel.ExistsActivatedEmail(registerPayload.Email)
	if err != nil {
		log.Panic(err)
	}

	if existsActivatedEmail {
		responder.RespondError(w, "Email has already been taken.", http.StatusConflict)
		return
	}

	// Create user record
	user, err := userModel.Create(registerPayload)
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

func (u UserController) Login(w http.ResponseWriter, r *http.Request) {
	var loginPayload forms.Login

	// Malformed JSON register payload
	err := json.NewDecoder(r.Body).Decode(&loginPayload)
	if err != nil {
		responder.RespondError(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if user exists
	existsUser, err := userModel.ExistsUsernamePassword(loginPayload)
	if err != nil {
		log.Panic(err)
	}

	if !existsUser {
		responder.RespondError(w, "Incorrect credentials.", http.StatusUnauthorized)
		return
	}

	// Get user
	user, err := userModel.GetByUsername(loginPayload.Username)
	if err != nil {
		log.Panic(err)
	}

	responder.RespondData(w, struct {
		Token string `json:"token"`
	}{
		Token: tokenizer.EncodeUserToken(user.ID),
	})
}
