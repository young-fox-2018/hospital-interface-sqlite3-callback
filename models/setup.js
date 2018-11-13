const db = require("./connectDB")

class setup {
    static setupEmployees(callback) {
        let queryCreateEmployees = `CREATE TABLE IF NOT EXISTS Employees (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    name TEXT,
                                    position TEXT,
                                    username TEXT,
                                    password TEXT,
                                    isLogin INTEGER
                                    );`

        db.serialize(function() {
            db.run(`DROP TABLE IF EXISTS Employees`, function(err) {
                if (err) callback(err, null)
            })
            db.run(queryCreateEmployees, function(err) {
                if (err) callback(err, null)
                else {
                    callback(null, "Successfully create Employees Table")
                }
            })
        })
        db.close()     
    }
    static setupPatients(callback) {
        let queryCreateEmployees = `CREATE TABLE IF NOT EXISTS Patients (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    name TEXT,
                                    diagnosis TEXT,
                                    doctor_id INTEGER
                                    );`

            db.serialize(function() {
                db.run(`DROP TABLE IF EXISTS Patients`, function(err) {
                    if (err) callback(err, null)
                })
                db.run(queryCreateEmployees, function(err) {
                    if (err) callback(err, null)
                else {
                    callback(null, "Successfully create Patients Table")
                }
                })
            })
            db.close()     
    }
}

module.exports = setup

