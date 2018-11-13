const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./hospital.db');

function createTableEmployees() {
    const queryEmployees= `CREATE TABLE Employees(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(20),     
        password VARCHAR(50),
        position VARCHAR(50),
        is_loggin INT DEFAULT 0
        );`
    
    db.serialize(function(){
        db.run("DROP TABLE IF EXISTS Employees;")
        db.run(queryEmployees, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log("Table Employees created")
            }
        })
    })
}
function createTablePatient(){
    const queryPatient= `CREATE TABLE Patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,    
        diagnose Text
        );`
    db.serialize(function(){
        db.run("DROP TABLE IF EXISTS Patients;")
        db.run(queryPatient, function(err){
            if(err) {
                console.log(err)
            }else{
                console.log("Table Patient created")
            }
        })
    })
}
//uncomment to create table
createTableEmployees()
createTablePatient()