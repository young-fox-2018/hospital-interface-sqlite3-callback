const Setup = require('../database/setup')
const View = require('../views/View')
const Employee = require('../models/Employee')

class EmployeeController {
    static createTable(tableName, field) {
        Setup.createTable(tableName, field, function (err) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(`Create table ${tableName} success!`)
            }
        })
    }
    static findAll() {
        Employee.findAll(function (err, data) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(data)
            }
        })
    }
    static register(name, position, username, password, login) {
        Employee.register(name, position, username, password, login, function (err, data) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(`Register Employee with name ${data[data.length - 1].name} success, Total Employee: ${data.length}`)
            }
        })
    }
    static login(username, password) {
        Employee.login(username, password, function (err) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(`Username ${username} successfully logged in`)
            }
        })
    }
    static logout() {
        Employee.logout(function (err) {
            if (err) {
                View.showErr(err)
            } else {
                View.showData(`Logout Success!`)
            }
        })
    }

}

module.exports = EmployeeController