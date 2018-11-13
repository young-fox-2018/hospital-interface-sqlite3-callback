const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

const createTableEmployee = `CREATE TABLE IF NOT EXISTS Employees
                                (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    name VARCHAR(30),
                                    username VARCHAR(15),
                                    password VARCHAR(10),
                                    position VARCHAR(15), 
                                    isLoggedIn INTEGER DEFAULT 0
                                )`;

const createTablePatients = `CREATE TABLE IF NOT EXISTS Patients
                                (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name VARCHAR(30),
                                    doctor INTEGER,
                                    diagnosis TEXT,
                                    FOREIGN KEY (doctor) REFERENCES Employees (id)
                                )`

db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS Employees`, function(err) {
        if (err) {
            console.log(err);
        }
    });
    db.run(`DROP TABLE IF EXISTS Patients`, function(err) {
        if (err) {
            console.log(err);
        }
    });

    db.run(createTableEmployee, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Table Employee created!`);
        }
    })

    db.run(createTablePatients, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Table Patients created!`);
        }
    })
})
db.close();