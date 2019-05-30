/* Load packages */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mysql = require("mysql2");

/* App initialization */
const API_PORT = 3001;
const app = express();
const router = express.Router();

/* App configurations */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

/* Establish MySQL connection */
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "examplardb"
});

/* GET route for course searches */
router.get("/courses", (req, resp) => {

  /* Get request info */
  const { query } = req;
  const { course, university } = query;

  /* Prepared query string */
  const dbQuery = `
    SELECT course_id, course_code, course_name, university_name 
    FROM course_table INNER JOIN university_table 
    ON course_table.university_id = university_table.university_id 
    WHERE (course_code LIKE ? OR course_name LIKE ?) AND university_name LIKE ? 
    LIMIT 5
  `;

  /* Query variables
  * Variables are padded with % to match substrings
  * A list is prepared to format the variables into the prepared query string */
  const courseQuery = `%${course}%`;
  const universityQuery = `%${university}%`;
  const varList = [courseQuery, courseQuery, universityQuery];

  /* Execute prepared query string */
  connection.execute(dbQuery, varList, (err, res, fields) => {

    /* Error handling */
    if (err) console.log(err);

    /* Send back an array of json objects
    * Map is used since MySQL returns an array of BinaryRow objects */
    resp.send(res.map(curr => ({ ...curr })));
  });
});

/* Adds a new course into the database */
router.post("/courses", (req, resp) => {

  /* Get body info */
  const { courseCode, courseName, universityId } = req.body;

  /* Prepared query string */
  const dbQuery = `
    INSERT INTO course_table 
    (course_id, course_code, course_name, university_id) 
    VALUES 
    (null, ?, ?, ?)
  `;

  /* Query variables */
  const varList = [courseCode, courseName, universityId];

  /* Execute prepared query string */
  connection.execute(dbQuery, varList, (err, res) => {

    /* Error handling */
    if (err) console.log(err);
    else resp.send(`${res.insertId}`);
  });
});

/* Gets information about a course */
router.get("/courses/:id", (req, resp) => {

  /* Course ID */
  const { id } = req.params;

  /* Query to get the information about the course */
  const courseQuery = `
    SELECT course_code, course_name, university_name 
    FROM course_table INNER JOIN university_table 
    ON course_table.university_id = university_table.university_id
    WHERE course_id = ?
  `;

  /* Query to get all of the exams belonging to the course */
  const examQuery = `
    SELECT exam_id, exam_year, exam_term 
    FROM exam_table 
    WHERE course_id = ?
  `;

  /* Chain the course and exam queries*/
  connection.execute(courseQuery, [id], (courseErr, courseRes) => {

    /* Error handling */
    if (courseErr) console.log(courseErr);

    /* Get the details of the course */
    const { course_code, course_name, university_name } = courseRes[0];

    connection.execute(examQuery, [id], (examErr, examRes) => {

      /* Error handling */
      if (examErr) console.log(examErr);

      /* Get the list of exams belonging to the course */
      const exams = examRes.map(
        curr => (
          {
            examId: curr.exam_id,
            examYear: curr.exam_year,
            examTerm: curr.exam_term
          }
        )
      );

      /* Send back a JSON object containing all the relevant information */
      resp.json({
        courseCode: course_code,
        courseName: course_name,
        universityName: university_name,
        exams: exams
      });
    });
  });
});

router.post("/courses/:id", (req, resp) => {

  /* Course ID */
  const { id } = req.params;

  /* Course details */
  const { examYear, examTerm } = req.body;

  /* Query string that inserts an exam into the database */
  const examQuery = `
    INSERT INTO examplardb.exam_table 
    (exam_id, exam_year, exam_term, course_id) 
    VALUES (NULL, ?, ?, ?)
  `;

  /* Query string that inserts a question to the above exam */
  const questionQuery = `
    INSERT INTO examplardb.question_table 
    (question_id, question_header, exam_id) 
    VALUES (NULL, 1, ?)
  `;

  /* Query variables */
  const varList = [examYear, examTerm, id];

  /* Insert an exam into the database */
  connection.execute(examQuery, varList, (examErr, examRes) => {

    const { insertId } = examRes;

    /* Error handling */
    if (examErr) console.log(examErr);

    /* Insert a question into the exam */
    connection.execute(questionQuery, [insertId], questionErr => {

      /* Error handling */
      if (questionErr) console.log(questionErr);

      resp.send(insertId.toString());
    });
  });
});

router.get("/exams/:id", (req, resp) => {

  /* Exam id */
  const { id } = req.params;

  const resArr = [];

  const questionQuery = `
    SELECT question_id, question_header 
    FROM examplardb.question_table 
    WHERE exam_id = ?
  `;

  const subQuestionQuery = `
    SELECT * 
    FROM examplardb.sub_question_table
  `;

  connection.execute(questionQuery, [id], (questionErr, questionRes) => {

    if (questionErr) console.log(questionErr);

    connection.execute(subQuestionQuery, (subErr, subRes) => {

      if (subErr) console.log(subErr);

      const questions = [];

      for (let question of questionRes) {
        const subQuestions = [];

        for (let subQuestion of subRes) {
          if (subQuestion.question_id === question.question_id)
            subQuestions.push({
              subQuestionId: subQuestion.sub_question_id,
              subQuestionNum: subQuestion.sub_question_number
            });
        }

        questions.push({
          questionId: question.question_id,
          questionHeader: question.question_header,
          subQuestions: [...subQuestions]
        });
      }

      resp.send(questions);
    });
  });
});

/* Append /api for HTTP requests */
app.use("/api", router);

/* Launch backend into a port */
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));