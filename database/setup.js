const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./database.db")


db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS Employees
            ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                position TEXT,
                username TEXT,
                password TEXT,
                status INT
            )`,
        (err) => {
            if (err) console.log(err.message)
        }
    )
    db.run(
        `CREATE TABLE IF NOT EXISTS Patients
            ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                diagnosisId INTEGER,
                     FOREIGN KEY (diagnosisId) REFERENCES Desease(id)
            )`,
        (err) => {
            if (err) console.log(err.message)
        }
    )
    db.run(
        `CREATE TABLE IF NOT EXISTS Desease
            ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            )`,
        (err) => {
            if (err) console.log(err.message)
        }
    )

})

db.close()
