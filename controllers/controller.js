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

    static update(id) {
        let options = {
            name: "Harley",
            password: "harley123",
            username: "Harley Quinzel"
        }
        Employee.update(id, options, function(err, data) {
            if (err) View.printError(err)
            else {
                View.printLine(data)
            }
        })
    }

    static findOne(table) {
        let options = {
            name: "harley",
            isLogin: 0,
            position: "doctor"
            }
        Employee.findOne(table, options, function(err, data) { // table name, options, callback
            if (err) View.printError(err)
            else {
                View.printLine(data)
            }
        })
    }

    static find(table) {
        Employee.find(table, function(err, data) {
            if (err) View.printError(err)
            else {
                View.printLine(data)
            }
        })
    }

    static login(username, password) {
        let options = {
                username: username,
                password: password
            }
        let isLoginTrue = {
                isLogin: 1
        }
        Employee.findOne("Employees", isLoginTrue, function(err, isLoginData) {
            if (err) View.printError(err)
            else {
                Employee.findOne("Employees", options, function(err, data){
                    if (err) View.printError(err)
                    else {
                        if (isLoginData == undefined) {
                            if (data == undefined) {
                                View.printError("Username / Password Salah")
                            } else {
                                Employee.update(`${data.id}`, isLoginTrue, function (err, message) {
                                        if (err) View.printError(err)
                                        else {
                                            View.printLine(`User ${data.name} has Successfully logged in`)
                                        }
                                })
                            }
                        } else { 
                            // uda ada orng lain yg login
                            View.printError("Logged out first")
                        }
                    }
                })
            }
        })

    }

    static logout() {
        let options = {isLogin:1}
        Employee.findOne("Employees", options, function (err, data){
            if (err) View.printError(err)
            else {
                 Employee.update(data.id , {isLogin:0}, function(err, message) {
                    if (err) View.printError(err)
                    else {
                        View.printLine(`User ${data.name} has successfully logout`)
                    }
                 })
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

