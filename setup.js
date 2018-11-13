const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./data.db');

let createTableEmployees = `
CREATE TABLE employees (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR (100) NOT NULL,
username VARCHAR(30) NOT NULL UNIQUE,
password VARCHAR(30) NOT NULL,
position VARCHAR (30) NOT NULL,
islogin BOOLEAN
);`

let createTablePatients = `
CREATE TABLE patients (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR (100) NOT NULL,
diagnosis VARCHAR NOT NULL
);
`

db.serialize(function() {
  db.run(createTableEmployees, function(err) {
    if (err) {
      throw err
    }
    console.log(`berhasil bikin table employees`);
  })

  db.run(createTablePatients, function(err) {
    if (err) {
      throw err
    }
    console.log(`berhasil bikin table patients`);
  })
})

db.close()

