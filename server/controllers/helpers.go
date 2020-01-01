package controllers

import (
	"encoding/json"
	"log"
	"net/http"
)

type ErrorResponse struct {
	Error Error `json:"error"`
}

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type DataResponse struct {
	Data interface{} `json:"data"`
}

func encodeResponse(w http.ResponseWriter, response interface{}) {
	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Panic(err)
	}
}

func RespondError(w http.ResponseWriter, status int, msg string) {
	w.WriteHeader(status)

	errorResponse := ErrorResponse{
		Error: Error{
			Code:    status,
			Message: msg,
		},
	}

	encodeResponse(w, errorResponse)
}

func RespondData(w http.ResponseWriter, data interface{}) {
	w.WriteHeader(http.StatusOK)

	dataResponse := DataResponse{
		Data: data,
	}

	encodeResponse(w, dataResponse)
}
