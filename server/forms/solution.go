package forms

type CreateSolution struct {
	Content string `json:"content" binding:"required"`
	ExamID  int    `json:"examId" binding:"required"`
}

type UpdateSolution struct {
	Content string `json:"content" binding:"required"`
}
