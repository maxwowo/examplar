package forms

type CreateSolution struct {
	Content string `json:"content"`
	ExamID  int    `json:"examId"`
}
