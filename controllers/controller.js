const Employees = require('../models/Employees')
const Patients = require('../models/Patients')
const View = require('../views/view')

class Controller {

    static register (option) {
        Employees.register(option[0], option[1], option[2], function(err, data) {
            if(err) {
                View.errDisplay(err)
            } else {
                Employees.findOne({
                    field: "id",
                    value: data.lastID
                }, function(err, data) {
                    if(err) {
                        View.errDisplay(err) 
                    } else {
                        View.addDisplay(data)
                    }
                })
            }
        })
    }

    static login (option) {
        Employees.login(option[0], option[1], function(err, data) {
            if(err) {
                View.errDisplay(err) 
            } else {
                View.successLogin(data)
            }
        })
    }

    static addPatient (option) {
        Employees.findOne({
            field: "isOnline",
            value: 'true'
        }, function(err, data) {
            if(err) {
                View.errDisplay(err)
            } else {
                if (data) {
                    if (data.position === 'dokter') {
                        Patients.addPatient(option, function(err, data) {
                            if(err) {
                                View.errDisplay(err)
                            } else {
                                View.addPatient(data)
                            }
                        })
                    } else {
                        View.errDisplay(`tidak memiliki akses untuk add patient`)
                    }
                }
            }
        })
    }

    static logout (option) {
        Employees.logout(option, function(err) {
            if(err) {
                View.errDisplay(err)
            } else {
                View.logout()
            }
        })
    }

}

module.exports = Controller