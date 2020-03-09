package models

type Solution struct {
	ID      int    `json:"id"`
	Content string `json:"content"`
	ExamID  int    `json:"examId"`
}
