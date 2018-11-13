
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("hospital.db");

//EMPLOYEES
db.serialize(function() {
    let tableQuery = `CREATE TABLE Employees (
        employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        position VARCHAR (10),
        username VARCHAR(10),
        password VARCHAR(10),
        login INTEGER,
        UNIQUE(username)
      );`
    db.run(tableQuery, function(err) {
        if(err) {
            throw err
        }
    })

    let tablePatient = `CREATE TABLE Patient (
        patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        diagnosis TEXT
    );`

    db.run(tablePatient, function(err){
        if(err) {
            throw err
        } 
    })
})