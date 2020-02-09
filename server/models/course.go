package models

import (
	"database/sql"
	"github.com/maxwowo/examplar/database"
	"github.com/maxwowo/examplar/forms"
	"github.com/maxwowo/examplar/packages/skylar"
)

type Course struct {
	ID           int    `json:"id"`
	Code         string `json:"code"`
	Name         string `json:"name"`
	UniversityID int    `json:"universityId"`
}

func buildCourses(rows *sql.Rows) ([]Course, error) {
	courses := make([]Course, 0)

	for rows.Next() {
		var course Course

		err := rows.Scan(&course.ID, &course.Code, &course.Name, &course.UniversityID)
		if err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return courses, nil
}

func (c Course) Create(coursePayload forms.CreateCourse) (*Course, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		INSERT INTO courses
		(id, code, name, university_id)
		VALUES 
		(DEFAULT, $1, $2, $3)
		RETURNING id, code, name
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var course Course

	err = stmt.QueryRow(coursePayload.Code, coursePayload.Name, coursePayload.UniversityID).Scan(&course.ID, &course.Code, &course.Name)
	if err != nil {
		return nil, err
	}

	return &course, nil
}

func (c Course) SearchByCourse(course string) ([]Course, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT courses.id, courses.code, courses.name, universities.id
		FROM courses INNER JOIN universities 
		ON courses.university_id = universities.id 
		WHERE (courses.code LIKE $1 OR courses.name LIKE $1)
		LIMIT 5
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(skylar.LikePad(course))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return buildCourses(rows)
}

func (c Course) SearchByCourseUniversity(course string, university int) ([]Course, error) {
	db := database.GetDatabase()

	stmt, err := db.Prepare(`
		SELECT courses.id, courses.code, courses.name, universities.id
		FROM courses INNER JOIN universities 
		ON courses.university_id = universities.id 
		WHERE (courses.code LIKE $1 OR courses.name LIKE $1) AND universities.id = $2
		LIMIT 5
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(skylar.LikePad(course), university)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return buildCourses(rows)
}
