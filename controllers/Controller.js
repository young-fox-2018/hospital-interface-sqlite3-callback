const Model = require('../models/Model')
const Employee = require('../Role/Employee.js')
const Patient = require('../Role/Patient.js')
const View = require('../views/View.js')
class Controller {

    static registerController(name, username, password, role) {
        if (name == undefined || username == undefined || password == undefined || role == undefined) {
            View.execute("Username, password, atau dokter harus diisi")
        } else if (name != undefined || username != undefined || password != undefined || role != undefined) {
            Employee.registerEmployee(name, password, role, function (err, data) {
                if (err) {
                    View.execute(err)
                } else {
                    View.execute(data)
                }
            })
        }
    }

    static loginController(username, password) {
        if (username == undefined || password == undefined) {
            View.execute("Username, password, atau dokter harus diisi")
        } else {
            Employee.loginEmployee(username, password, function (err, data) {
                if (err) {
                    View.execute(err)
                } else {
                    View.execute(data)
                }
            })
        }
    }

    static addPatientController(id, nama, gejala) {
        if (id == undefined || nama == undefined || gejala == undefined) {
            View.execute("id, nama, atau gejala harap diisi yaa")
        } else if (id != undefined || nama != undefined || gejala != undefined) {
            Employee.addPatient(nama, gejala, function (err, data) {
                if (err) {
                    View.execute(err)
                } else {
                    View.execute(data)
                }
            })
        }
    }

    static logoutController(id){
        Employee.logoutEmployee(id, function(err,data) {
            if (err) {
                View.execute(err)
            } else {
                View.execute(data)
            }
        })
    }
}

module.exports = Controller