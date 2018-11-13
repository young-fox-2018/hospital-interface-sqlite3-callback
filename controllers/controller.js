const Setup = require("../models/setup")
const Employee = require("../models/employee")
const Seed = require("../models/seed")
const View  = require("../views/view")

class Controller {
    static setupEmployee() {
        Setup.setupEmployees(function(err, data) {
            if (err) View.printError(err)
            else {
                View.printLine(data)
            }
        }) 
    }
    
    static setupPatients() {
        Setup.setupPatients(function(err, data) {
            if (err) View.printError(err)
            else {
                View.printLine(data)
            }
        }) 
    }

    static addEmployee(name, position,password) {
        Employee.addEmployee(name, position, password, function (err, data) {
            if (err) View.printError(err)
            else {
                View.printEmployee(data)
            }
        })
    }

    static updateEmployee(id, field, newValue) {
        Employee.update(id, field, newValue, function(err, data) {
            if (err) View.printError(err)
            else {
                View.printUpdateEmployee(id, data)
            }
        })
    }

    static findById(id) {
        Employee.findById(id, function(err, data){
            if (err) View.printError(err)
            else {
                if (data.length == 0) View.printLine("ID Not Found!")
                else {
                    View.printLine(data)
                }
            }
        })
    }

    static findAll() {
        Employee.findAll(function(err, data) {
            if (err) View.printError(err)
            else {
                View.printLine(data)
            }
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err, data){
            if (err) View.printError(err)
            else {
                if (data) {
                    View.printLoginUser(data)
                } else {
                    View.printError(err)
                }
            }
        })
    }

    static logout() {
        Employee.logout(function(err, result){
            if (err) View.printError(err)
            else {
                View.printLine(result)
            }
        })
    }

    static addPatient(patientName, diagnosis) {
        Employee.addPatient(patientName, diagnosis, function(err, data){
            if (err) View.printError(err)
            else {
                if (data) {
                    View.printAddPatient(data)
                } else {
                    View.printError(err)
                }
            }
        })
    }
    

}

module.exports = Controller

