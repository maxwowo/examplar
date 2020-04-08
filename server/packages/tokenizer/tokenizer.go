package tokenizer

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/go-chi/jwtauth"
	"log"
	"time"
)

type Token struct {
	TokenClaim string
	TokenAuth  *jwtauth.JWTAuth
}

var userToken *Token
var activationToken *Token

func Initialize() {
	userToken = &Token{
		TokenClaim: "user_id",
		TokenAuth:  jwtauth.New("HS256", []byte("user-token-secret"), nil),
	}

	activationToken = &Token{
		TokenClaim: "user_id",
		TokenAuth:  jwtauth.New("HS256", []byte("activation-token-secret"), nil),
	}

	log.Printf("DEBUG: a sample user JWT for user ID 1 is %s\n\n", EncodeUserToken(1))
	log.Printf("DEBUG: a sample activation JWT for user ID 1 is %s\n\n", EncodeActivationToken(1))
}

func GetUserToken() *Token {
	return userToken
}

func GetActivationToken() *Token {
	return activationToken
}

func EncodeUserToken(id int) string {
	claims := jwt.MapClaims{userToken.TokenClaim: id}
	jwtauth.SetIssuedNow(claims)
	jwtauth.SetExpiryIn(claims, 4*24*time.Hour)

	_, tokenString, err := userToken.TokenAuth.Encode(claims)
	if err != nil {
		log.Panic("Failed to encode user token.")
	}

	return tokenString
}

func EncodeActivationToken(id int) string {
	claims := jwt.MapClaims{userToken.TokenClaim: id}
	jwtauth.SetIssuedNow(claims)
	jwtauth.SetExpiryIn(claims, 3*time.Hour)

	_, tokenString, err := activationToken.TokenAuth.Encode(claims)
	if err != nil {
		log.Panic("Failed to encode activation token.")
	}

	return tokenString
}
