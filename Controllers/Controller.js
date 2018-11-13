const Employee = require('../Models/Employee')
const Patient = require('../Models/Patient')
const View = require('../Views/View')


class Controller {
    static register(username, password, position) {
        Employee.register(username, password, position, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.showData(`Save data succes {'username':${username}, 'password':${password}, 'role':${position}}`)
            }
        })

    }
    static findAll() {
        Employee.findAll((err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.showData(data)
            }
        })
    }

    static findOne(table, field, input) {
        Employee.findOne(table, field, input, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                if (!data) {
                    View.showData(`Data ${field} ${input} tidak ada di database ${table}`)
                } else {
                    View.showData(data)
                }
            }
        })
    }
    static delete(table, field, param) {
        Employee.delete(table, field, param, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.showData(`Data has been delete!`)
            }
        })
    }
    static login(username, password) {
        Employee.login(username, password, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.showData(data)
            }

        })
    }
    static logout(username) {
        Employee.logout(username, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.showData(data)
            }
        })
    }
    static addPatient(name, diseases) {
        Employee.findOne('employees', 'status', 1, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                if (data) {
                    if (data.role !== 'dokter') {
                        View.showError(`You dont have permission to add data patient!`)
                    } else {
                        let newPatient = {
                            name: name,
                            diseases: diseases
                        }
                        Patient.addPatient(newPatient, (err, data) => {
                            if (err) {
                                View.showError(err)
                            } else {
                                View.showData(`Data patient has been added to database!`)
                            }
                        })
                    }
                } else {
                    View.showError(`Please logged in as dokter to add data patient!`)
                }

            }
        })
    }

}
module.exports = Controller
