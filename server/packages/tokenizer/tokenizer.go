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

	log.Printf("DEBUG: a sample jwt is %s\n\n", Encode(1))
}

func GetToken() *Token {
	return tk
}

func Encode(id int) string {
	claims := jwt.MapClaims{tk.TokenClaim: id}
	jwtauth.SetIssuedNow(claims)
	jwtauth.SetExpiryIn(claims, 4*24*time.Hour)

	_, tokenString, _ := tk.TokenAuth.Encode(claims)

	return tokenString
}
