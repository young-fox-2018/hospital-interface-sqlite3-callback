const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./hospital.db")

let qEmployees = `
CREATE TABLE employees
(id INTEGER PRIMARY KEY AUTOINCREMENT,
username VARCHAR(100),
password VARCHAR(50),
position VARCHAR(50),
isLoggedIn INTEGER);`

let qPatients =`
CREATE TABLE patients
(id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(100),
diagnosis TEXT);`

db.serialize(function() {
    db.run(qEmployees, function(err) {
        if (err) {
            console.log({message: "table err", err: err});
        }
    })
    db.run(qPatients, function(err) {
        if (err) {
            console.log({messagr: "table err", err: err});
        }
    })
})
