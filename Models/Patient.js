const db = require('../Database/db')


class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }
    static addPatient(newPatient, callback) {
        // console.log(newPatient)
        let query = `INSERT INTO patients (name,diagnosis)VALUES ('${newPatient.name}','${newPatient.diseases}')`
        db.run(query, (err) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, null)
            }
        })

    }
}
module.exports = Patient