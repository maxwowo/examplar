package forms

type CreateSolution struct {
	Content string `json:"content"`
	ExamID  int    `json:"examId"`
}

type UpdateSolution struct {
	Content string `json:"content"`
}
