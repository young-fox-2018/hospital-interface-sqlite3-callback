const Patient = require('../models/Patient')
const View = require('../views/view')

class PatientController {
    
    static setup() {
        Patient.setup(function(err) {
            if (err) View.errorAlert(err)
            else View.showMessage(`Table Patients created`)
        }) 

    }
}

module.exports = PatientController