const {db} = require('./setup')
const Employee = require('./employee')

class Patient {
    constructor(name, diagnose) {
        this.name = name
        this.diagnose = diagnose
    }

    static findAllPatients(callback) {
        db.all(`SELECT * FROM patients`,
            function(err, data) {
                if (err) callback(err, null)
                else callback(null, data)
            })
    }

    static addPatient(name, diagnose, callback) {
        Employee.findAllEmployees(function(err, data) {
            if (err) callback(err, null)
            else {
                let check = false
                data.forEach(element => {
                    if (element.isLogin  == 1 && element.position == 'dokter') {
                        let newPatient = new Patient(name, diagnose)
                        db.run(`INSERT INTO patients (name, diagnose) VALUES ("${newPatient.name}", "${newPatient.diagnose}")`,
                            function(err) {
                                if (err) callback(err)
                                else {
                                    Patient.findAllPatients(function(err, data) {
                                        if (err) callback(err, null)
                                        else callback(null, data)
                                    })
                                }
                            })
                        check = true
                    }
                });
                if (!check) {
                    callback(`Please login and make sure you have access to add patient`)
                }
            }
        })
    }
}

module.exports = Patient