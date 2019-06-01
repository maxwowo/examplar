/* A script that adds all universities to the database */

import universities from "../../client/src/constants/universities";

let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "examplardb"
});

for (let uni of universities)
  connection.execute("INSERT INTO `examplardb`.`university_table` (`university_id`, `university_name`) VALUES (NULL, ?)", [uni]);
