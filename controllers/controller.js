const Employee = require("../models/employee")
const View = require("../views/view")
const Patient = require("../models/patients")

class Controller {
    static register(name, position, username, password) {
        Employee.register(name, position, username, password, (err, data) => {
            if (err) View.displayErr(err)
            else View.displayData("data berhasil disimpan" + data)
        })
    }
    static login(username, password) {
        Employee.login(username, password, (err) => {
            if (err) View.displayErr(err)
            else View.displayData("Anda berhasil login")
        })
    }
    static logout(username) {
        Employee.logout(username, (err) => {
            if (err) View.displayErr(err)
            else View.displayData("Anda berhasil logout")
        })
    }
    static addPatient(name, diagnosis) {
        Patient.addPatient(name, diagnosis, (err) => {
            if (err) View.displayErr(err)
            else View.displayData("Data Pasien berhasil disimpan ")
        })
    }
}
module.exports = Controller