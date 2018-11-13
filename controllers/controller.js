"require strict"
const Employee = require('../models/Employees.js')
const View = require('../views/Views.js')
const Patient = require('../models/Patients.js')

class Controller {
    static createEmployeesTable() {
        Employee.createTable((err, data) => {
            if (err) {
                View.printErrorData(err)
            } else {
                View.printSuccessData(data.message)
            }
        })
    }
    
    static registerEmployee(name, password, role, age) {
        let userInfo = {
            name : name,
            password : password,
            role : role,
            age: age
        }

        Employee.insertData(userInfo, (err, data) => {
            if (err) {
                View.printErrorData(err)
            } else {
                if (data) { 
                    Employee.getTotal((error , total) => {
                        if (error) {
                            View.printErrorData(error)
                        } else {
                            View.printSuccessData(JSON.stringify(data), JSON.stringify(total.totalEmployees))     
                        }
                    })            
                } else {
                    View.printErrorData( {
                        message : 'Data not found'
                    })
                }
            }
        })
    }

    static login(name, password) {
        let userInfo = {
            field1 : name,
            field2 : password
        }

        Employee.check(userInfo, 'name', 'password', (err, data) => {
            if (err) {
                View.printErrorData(err)
            } else {
                if (!data) {
                    View.printErrorData({
                        error : 'login failed',
                        message : 'User / password is  wrong'
                    })
                } else {
                    Employee.update('name',userInfo.field1, 'loggedIn', 1, (err , data) => {
                        if (err) {
                            View.printErrorData({
                                error : 'Error login',
                                message: err
                            })
                        } else {
                            View.printSuccessData(`user ${userInfo.field1} logged in successfully`)
                        }
                    })
                }
            }
        })
    }

    static addPatient(name, diagnosis) {
        let patient = {
            name : name,
            diagnosis: diagnosis
        }

        let employee = {
            field1 : 'doctor',
            field2 :  1
        }

        Employee.check(employee, 'role', 'loggedIn', (err, data) => {
            if (err) {
                View.printErrorData({
                    err : err,
                    message : 'Failed to check role'
                })
            } else {
                if (!data) {
                    View.printErrorData({
                        err : 'wrong username',
                        message : 'role is not doctor'
                    })
                } else {
                Patient.addPatient(patient, (err) => {
                    if (err) {
                        View.printErrorData({
                            error : err,
                            message: 'Failed add patient'
                        })
                    } else {
                        Patient.getPatiensCount((err, counts) => {
                            if (err) {
                                View.printErrorData( {
                                    error : err,
                                    message : 'failed to get total patients'
                                })
                            } else {
                                View.printSuccessData(`Add patient succeed. Total patients: ${counts.totalPatients}`)
                            }
                        })
                        }
                    })
                }
            }
        })
    }
}

module.exports = Controller