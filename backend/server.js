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

// // this is our create methid
// // this method adds new data in our database
// router.post("/putData", (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

router.get("/courses", function (req, res) {
  const { query } = req;

  res.send([
    {
      courseCode: "COMP1511",
      courseName: "Fundamentals of Computing"
    },
    {
      courseCode: "COMP2521",
      courseName: "Data Structures and Algorithms"
    },
    {
      courseCode: "COMP2111",
      courseName: "System Modelling and Design"
    },
    {
      courseCode: "MATH1131",
      courseName: "Mathematics 1A"
    },
    {
      courseCode: "MATH1231",
      courseName: "Mathematics 1B"
    }
  ]);
});


// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => {
  console.log(`LISTENING ON PORT ${API_PORT}`);
});