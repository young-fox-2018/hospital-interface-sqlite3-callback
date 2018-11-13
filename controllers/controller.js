const {Setup} = require('../models/setup')
const Employee = require('../models/employee')
const Patient = require('../models/patient')
const View = require('../views/view')

class Controller {
    static setup() {
        Setup.init(function(err) {
            if (err) View.displayError(err)
            else View.setup()
        })
    }
    
    static findAllEmployees() {
        Employee.findAllEmployees(function(err, data) {
            if (err) View.displayError(err)
            else View.displayData(data)
        })
    }

    static findOneEmployee(id) {
        Employee.findOneEmployee(id, function(err, data) {
            if (err) View.displayError(err)
            else View.displayData(data)
        })
    }

    static register(username, password, position) {
        Employee.register(username, password, position, function (err, data) {
            if (err) View.displayError(err)
            else View.register(data)
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data) {
            if (err) View.displayError(err)
            else View.login(data)
        })
    }

    static logout() {
        Employee.logout(function(err, data) {
            if (err) View.displayError(err)
            else View.logout()
            
        })
    }

    static updateMyData(field, newValue) {
        Employee.updateMyData(field, newValue, function(err, data) {
            if (err) View.displayError(err)
            else View.updateMyData(data)
        })
    }

    static deleteMyAccount() {
        Employee.deleteMyAccount(function(err) {
            if (err) View.displayError(err)
            else View.deleteMyAccount()
        })
    }

    static addPatient(name, diagnose) {
        Patient.addPatient(name, diagnose, function(err, data) {
            if (err) View.displayError(err)
            else View.addPatient(data)
        })
    }

}

module.exports = Controller