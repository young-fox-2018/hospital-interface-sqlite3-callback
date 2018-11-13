const db = require('./db')

db.serialize(function() {

    let createEmployees =
    `
    CREATE TABLE employees
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        position VARCHAR,
        username VARCHAR UNIQUE,
        password VARCHAR,
        isOnline VARCHAR
    )
    `
    db.run(createEmployees, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log(`berhasil`)
        }
    })

    let createPatients =
    `
    CREATE TABLE patients
    ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        diagnosis VARCHAR
    )
    `
    db.run(createPatients, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log(`berhasil`)
        }
    })
    

});

db.close()