const db = require('../database/db')

class Patient {
    static addPatient(cb) {
        let query = `SELECT position, status FROM Employees
        WHERE position ="dokter" AND status = 1`
        db.get(query, function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                if (!data) {
                    console.log(`Only Doctor Can Access This Feature!`)
                } else {
                    let query = `INSERT INTO Patients
                    VALUES (null, "${name}", "${diagnosis}")`
                    db.run(query, function (err) {
                        if (err) {
                            cb(err)
                        } else {
                            db.get(`SELECT * FROM Patients
                            WHERE id = ${this.lastID}`, function (err, data) {
                                    if (err) {
                                        cb(err, null)
                                    } else {
                                        cb(null, data)
                                    }
                                })
                        }
                    })
                }
            }
        })
    }
}

module.exports = Patient