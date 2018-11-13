const Patient = require('../models/Patient')
const View = require('../views/View')

class PatientController {
    static add(name, diagnosa) {
        Patient.findOne("employees", "logged", 1, function(err, row) {
            if (err) View.showError(err)
            else{
                if(row.role === "dokter"){
                    Patient.addPatient(name, diagnosa, function(err, data) {
                        if(err) View.showError(err)
                        else View.showData(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
                    })
                }else{
                    View.showError("tidak memiliki akses untuk add patient")
                }
            }
        })
    }
}

module.exports = PatientController