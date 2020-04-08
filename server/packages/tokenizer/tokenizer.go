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

var tk *Token

func Initialize() {
	token := &Token{
		TokenClaim: "user_id",
		TokenAuth:  jwtauth.New("HS256", []byte("secret"), nil),
	}

	tk = token

	log.Printf("DEBUG: a sample user JWT for user ID 1 is %s\n\n", EncodeUserToken(1))
	log.Printf("DEBUG: a sample email confirmation JWT for user ID 1 is %s\n\n", EncodeEmailConfirmationToken(1))
}

func GetToken() *Token {
	return tk
}

func encode(id int, expiryIn time.Duration) (string, error) {
	claims := jwt.MapClaims{tk.TokenClaim: id}
	jwtauth.SetIssuedNow(claims)
	jwtauth.SetExpiryIn(claims, expiryIn)

	_, tokenString, err := tk.TokenAuth.Encode(claims)

	return tokenString, err
}

func EncodeUserToken(id int) string {
	tokenString, err := encode(id, 4*24*time.Hour)
	if err != nil {
		log.Panic("Failed to encode user token.")
	}

	return tokenString
}

func EncodeEmailConfirmationToken(id int) string {
	tokenString, err := encode(id, 3*time.Hour)
	if err != nil {
		log.Panic("Failed to encode email confirmation token.")
	}

	return tokenString
}
