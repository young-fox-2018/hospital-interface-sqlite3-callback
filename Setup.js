const db = require('./db')

class Setup{
    static createEmployee(){
        let query = `CREATE TABLE IF NOT EXISTS Employee (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position VARCHAR,
            username VARCHAR NOT NULL UNIQUE,
            password VARCHAR,
            isLogin BOOLEAN
        )`

        db.serialize(function (err) {
            if (err) {
                throw err
            }
            db.run(query, function (err) {
                if (err) {
                    throw err
                }

                console.log(`Add employee success`);
            })
        })
    }
    
    static createPatient() { 
        let query = `CREATE TABLE IF NOT EXISTS Patient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR,
            diagnosis VARCHAR
        )`

        db.serialize(function(err) {
            if (err) {
                throw err
            }
            db.run(query, function(err) {
                if (err) {
                    throw err
                }
                console.log(`Add patient success`);
            })
        })
    }
}

Setup.createEmployee()
Setup.createPatient()