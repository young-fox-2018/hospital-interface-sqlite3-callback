const Setup = require('../database/setup')
const View = require('../views/View')
const Patient = require('../models/Patient')

class PatientController {
    static createTable(tableName, field) {
        Setup.createTable(tableName, field, function (err) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(`Create table ${tableName} success!`)
            }
        })
    }
    static addPatient(name, diagnosis) {
        Patient.addPatient(name, diagnosis, function (err, data) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(`Patient Data with name ${data.name} has been successfully registered`)
            }
        })
    }
}

module.exports = PatientController