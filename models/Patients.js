"use struct"
const db = require('./Database.js')

class Patient {
    constructor(name, diagnosis) {
        this.name = name
        this.diagnosis = diagnosis
    }

    static addPatient(patient, cb) {
        const newPatient = new Patient(patient.name, patient.diagnosis)

        const statement = db.prepare(`INSERT INTO Patients(name, diagnosis)
                                        VALUES(?, ?)`)

        statement.run(newPatient.name, newPatient.diagnosis, err => {
            if (err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static getPatiensCount(cb) {
        const statement = db.prepare(`SELECT COUNT(*) as totalPatients FROM Patients`)
        
        statement.get((err, row) => {
            if (err) {
                cb(err)
            } else {
                cb(null, row)
            }
        })
    }
}

module.exports = Patient