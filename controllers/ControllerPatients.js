const Patients = require('../models/Patients')
const Employees = require('../models/Employees')
const View = require('../views/View')

class ControllerPatients {
    static addPatient(name, disease){
        Patients.addPatient(name, disease, function(err, data) {
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`data pasien berhasil ditambahkan. Total data pasien: ${data.length}`)
            }
        })
    }
}


module.exports = ControllerPatients