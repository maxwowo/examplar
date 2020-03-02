package forms

type CreateExam struct {
	ExamYear int `json:"examYear" binding:"required"`
	ExamTerm int `json:"examTerm" binding:"required"`
	CourseID int `json:"courseId" binding:"required"`
}
