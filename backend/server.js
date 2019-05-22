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
router.get("/courses", function (req, res) {

  /* Get request info */
  const { query } = req;
  const { course, university } = query;

  /* Query variables */
  const courseQuery = course ? `%${course}%` : "";
  const universityQuery = university ? `%${university}%` : "";

  /* Prepared query string */
  const dbQuery = `SELECT course_id, course_code, course_name, university_name FROM course_table INNER JOIN university_table ON course_table.university_id = university_table.university_id WHERE course_code LIKE ? OR course_name LIKE ? OR university_name LIKE ? LIMIT 10`;

  /* Execute prepared query string */
  connection.execute(dbQuery, [courseQuery, courseQuery, universityQuery], (err, results, fields) => {

    /* Send back an array of json objects
    * Map is used since MySQL returns an array of BinaryRow objects */
    res.send(results.map(curr => ({ ...curr })));
  });
});

/* Append /api for HTTP requests */
app.use("/api", router);

/* Launch backend into a port */
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));