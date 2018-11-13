const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('hospital.db')

db.serialize(function() {
    db.run('DROP TABLE IF EXISTS Employees')
    db.run('DROP TABLE IF EXISTS Patients')
    const createTableQuery = `CREATE TABLE Employees
                                (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name VARCHAR(150),
                                    role VARCHAR(50),
                                    password VARCHAR(200),
                                    age INTEGER,
                                    loggedIn INTEGER
                                )`
    db.run(createTableQuery, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Table is successfully created')
            }
        })

    const createPatientTableQuery = `CREATE TABLE Patients
                                (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name VARCHAR(150),
                                    diagnosis VARCHAR(255)
                                )`

    db.run(createPatientTableQuery, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Patient Table is successfully created')
        }
    })
})

db.close()