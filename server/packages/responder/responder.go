package responder

import (
	"encoding/json"
	"log"
	"net/http"
)

type errorResponse struct {
	ErrorBody errorBody `json:"error"`
}

type errorBody struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type dataResponse struct {
	Data interface{} `json:"data"`
}

func encodeResponse(w http.ResponseWriter, response interface{}) {
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Panic(err)
	}
}

func RespondError(w http.ResponseWriter, msg string, status int) {
	w.WriteHeader(status)

	errorResponse := errorResponse{
		ErrorBody: errorBody{
			Code:    status,
			Message: msg,
		},
	}

	encodeResponse(w, errorResponse)
}

func RespondData(w http.ResponseWriter, data interface{}) {
	w.WriteHeader(http.StatusOK)

	dataResponse := dataResponse{
		Data: data,
	}

	encodeResponse(w, dataResponse)
}
