const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/hospital.db')

db.serialize(function(){
    db.run('DROP TABLE IF EXISTS Employees')
    db.run('DROP TABLE IF EXISTS Patients')

    let qCreateEmployee = `
        CREATE TABLE IF NOT EXISTS Employees(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30),
        position VARCHAR(20),
        username VARCHAR(20),
        password VARCHAR(20),
        isLogin INTEGER
    )
    `

    let qCreatePatient = `
        CREATE TABLE IF NOT EXISTS Patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(30),
        diagnosis VARCHAR(100)
    )
    `
    db.run(qCreateEmployee,function(err){
        if(err){
            console.log({
                Message: "error create table Employees",
                Error: err
            })
        } else {
            console.log("---Successfully create table Employees---")
        }
    })

    db.run(qCreatePatient,function(err){
        if(err){
            console.log({
                Message: "error create table Patients",
                Error: err
            })
        } else {
            console.log("---Successfully create table Patients---")
        }
    })

})
db.close()