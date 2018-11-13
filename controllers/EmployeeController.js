const Employee = require('../models/Employee')
const View = require('../views/View')

class EmployeeController {

    // static createTable() {
    //     Employee.createTable(function(err) {
    //         if(err) View.showError(err)
    //         else View.showData("Table created successfully")
    //     })
    // }

    // static drop() {
    //     Employee.drop(function(err) {
    //         if(err) View.showError(err)
    //         else View.showData("Table dropped")
    //     })
    // }

    static help() {
        View.showData(
        `register <username> <password> <role>
        login <username> <password>
        logout
        addPatient <patientName> <diagnosa>`)
    }

    static register(username, password, role) {
        Employee.register(username, password, role, function(err, data) {
            if(err) View.showError(err)
            else {
                View.showData(`save data successfull {"username":"${username}", "password":"${password}", "role":"${role}"}. Total employee: ${data.length}`)
            }
        })
    }

    static login(username, password){
        Employee.findOne("employees", "logged", 1, function(err, row) {
            if (err) View.showError(err)
            else if (!row) {
                Employee.findOne("employees", "username", username, function(err, row) {
                    if(err) View.showError(err)
                    else{
                        if(!row || row.password !== password) View.showError("username / password wrong")
                        else{
                            Employee.update("employees", "logged", 1, row.id, function(err) {
                                if(err) View.showError(err)
                                else{
                                    View.showData(`user ${username} logged in successfully`)
                                }
                            })
                        }
                    }
                })
            } else {
                View.showError("Other user is currently login. Please logout first")
            }
        })   
    }

    static logout() {
        Employee.findAll("employees", function(err, rows) {
            if(err) View.showError(err)
            else {
                let errorCount = 0
                rows.forEach(item => {
                    Employee.update("employees", "logged", 0, item.id, function(err) {
                        if (err){
                            View.showError(err)
                            errorCount++
                        }
                    })
                })

                if(errorCount === 0) View.showData("User has been logged out")
            }
        })
    }
}

module.exports = EmployeeController