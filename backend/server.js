const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mysql = require("mysql2");

const API_PORT = 3001;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "examplardb"
});

router.get("/courses", function (req, res) {

  /* Get request info */
  const { query } = req;
  const { course, university } = query;

  /* Query variables */
  const courseQuery = course ? `%${course}%` : "";
  const universityQuery = university ? `%${university}%` : "";

  /* Prepared query string */
  const dbQuery = `SELECT course_id, course_code, course_name, university_name FROM course_table INNER JOIN university_table ON course_table.university_id = university_table.university_id WHERE course_code LIKE ? OR course_name LIKE ? OR university_name LIKE ? LIMIT 10`;

  connection.execute(dbQuery, [courseQuery, courseQuery, universityQuery], (err, results, fields) => {
    res.send(results.map(curr => ({ ...curr })));
  });
});


// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => {
  console.log(`LISTENING ON PORT ${API_PORT}`);
});