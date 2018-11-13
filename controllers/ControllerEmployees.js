const Employees = require('../models/Employees')
const View = require('../views/View')

class ControllerEmployees {
    static register(username, password, role) {
        let newEmp = new Employees({
            username: username,
            password: password,
            role: role
        })

        newEmp.save(function(err, data){
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`save data success ${JSON.stringify(newEmp)}. Total employee : ${data.length}`)
            }
        })
    }

    static login (username, password) {
        Employees.login(username, password, function(err, usernameLogged){
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`user ${usernameLogged} logged in successfully`)
            }
        })
    }

    static logout(){
        Employees.logOut(function(err, data){
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(`user ${data.username} has logged out successfully`)
            }
        })
    }

    // static setup(){
    //     Employees.setup()
    // }

    
}

module.exports = ControllerEmployees