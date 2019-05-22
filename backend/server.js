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
router.get("/courses", (req, res) => {

  /* Get request info */
  const { query } = req;
  const { course, university } = query;

  /* Prepared query string */
  const dbQuery = `
    SELECT course_id, course_code, course_name, university_name 
    FROM course_table INNER JOIN university_table 
    ON course_table.university_id = university_table.university_id 
    WHERE (course_code LIKE ? OR course_name LIKE ?) AND university_name LIKE ? 
    LIMIT 10
  `;

  /* Query variables
  * Variables are padded with % to match substrings
  * A list is prepared to format the variables into the prepared query string */
  const courseQuery = `%${course}%`;
  const universityQuery = `%${university}%`;
  const varList = [courseQuery, courseQuery, universityQuery];

  /* Execute prepared query string */
  connection.execute(dbQuery, varList, (err, results, fields) => {

    /* Send back an array of json objects
    * Map is used since MySQL returns an array of BinaryRow objects */
    res.send(results.map(curr => ({ ...curr })));
  });
});

router.post("/courses", (req, res) => {

  /* Get body info */
  const { courseCode, courseName, universityID } = req.body;

  /* Prepared query string */
  const dbQuery = `
    INSERT INTO examplardb.course_table 
    (course_id, course_code, course_name, university_id) 
    VALUES 
    (null, ?, ?, ?)
  `;

  /* Query variables */
  const varList = [courseCode, courseName, universityID];

  /* Execute prepared query string */
  connection.execute(dbQuery, varList, (err, results, fields) => {

    /* Error handling */
    if (err) res.send(err);
    else res.send(`${results.insertId}`);
  });
});

/* Append /api for HTTP requests */
app.use("/api", router);

/* Launch backend into a port */
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));