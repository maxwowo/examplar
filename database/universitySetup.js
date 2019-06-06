const fs = require("fs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "examplar",
  password: "password",
  database: "examplardb"
});

const contents = fs.readFileSync(`${__dirname}/universities.txt`, "utf8");

contents.split("\n").map((curr, i) => {
  connection.execute("INSERT INTO `examplardb`.`university_table` (`university_id`, `university_name`) VALUES (?, ?)", [i, curr]);
  console.log(`Inserted ${curr}`);
});
console.log("Finished adding universities");
