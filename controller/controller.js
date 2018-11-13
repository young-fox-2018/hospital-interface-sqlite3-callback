const Model = require('/Users/admin/Documents/Phase 1/Week 3/hospital-interface-sqlite3-callback/model/model.js')
const View = require('/Users/admin/Documents/Phase 1/Week 3/hospital-interface-sqlite3-callback/view/View.js')

class Controller {
    static register(name, role, username, password, isLogin) {
        let input = {
            name: name,
            role: role,
            username: username,
            password: password,
            isLogin: isLogin
        }
        Model.register(input, function(err) {
            if(err) {
                View.displayError(err)
            } else {
                View.displaySuccess('Success Added Employee Data!')
            }
        })
    }

    static addPatient(name, age, diagnose) {
        let input = {
            name: name,
            age: age,
            diagnose: diagnose
        }
        Model.addPatient(input, function(err) {
            if(err) {
                View.displayErrorAddPatient(err)
            } else {
                View.displaySuccessAddPatient('Success Added Patient Data!')
            }
        })
    }
    static login(username, password) {
        let input = {
            username: username,
            password: password
        }
        Model.login(input, function(err) {
            if(err) {
                View.displayErrorLogin(err)
            } else {
                View.displaySuccessLogin('user logged in successfully')
            }
        })
    }
    static logout(username) {
        Model.logout(username, function(err, data) {
            if(err) {
                View.displayErrorLogin(err)
            } else {
                View.displaySuccessLogin('user logged out successfully')
            }
        })
    }
}

module.exports = Controller