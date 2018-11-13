const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

db.serialize(function() {
    let createEmployeeTable = 
    `CREATE TABLE IF NOT EXISTS Employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        role VARCHAR(50),
        username VARCHAR(50),
        password INTEGER,
        isLogin INTEGER
    )`
    db.run(createEmployeeTable, function(err) {
        if(err) {
            console.log('err: ', err)
        } else {
            console.log('Success Create Employees Table!')
        }
    })

    let createPatientTable = 
    `CREATE TABLE IF NOT EXISTS Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        age INTEGER,
        diagnose VARCHAR(100)
    )`
    db.run(createPatientTable, function(err) {
        if(err) {
            console.log('err: ', err)
        } else {
            console.log('Success Crete Patients Table!')
        }
    })
    db.close()
})

// module.exports = db