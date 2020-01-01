package forms

type CreateCourse struct {
	Code         string `json:"code" binding:"required"`
	Name         string `json:"name" binding:"required"`
	UniversityID int    `json:"universityId" binding:"required"`
}
