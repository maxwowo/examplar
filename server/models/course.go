package models

import (
	"github.com/maxwowo/examplar/database"
)

type Course struct {
	ID   int    `json:"id"`
	Code string `json:"code"`
	Name string `json:"name"`
}

func (c Course) GetByCourseUniversity(course string, university string) ([]Course, error) {
	db := database.GetDatabase()

	query := `
	SELECT courses.id, courses.code, courses.name, universities.name
	FROM courses INNER JOIN universities 
	ON courses.university_id = universities.id 
	WHERE (courses.code LIKE $1 OR courses.name LIKE $1) AND universities.name LIKE $2 
	LIMIT 5
	`

	rows, err := db.Query(query, course, university)
	if err != nil {
		return nil, err
	}

	courses := make([]Course, 0)

	for rows.Next() {
		var row Course

		err = rows.Scan(&row.ID, &row.Code, &row.Name)
		if err != nil {
			return nil, err
		}

		courses = append(courses, row)
	}

	return courses, nil
}
