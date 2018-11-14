const Model = require('../model/model.js')
const View = require('../view/View.js')

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

        Model.findOne({
            field: 'username', value: input.username
        }, function(err, row) {
            if(err) {
                View.displayError(err)
            } else {
                if(row === undefined) {
                    View.displayError('username not found')
                } else {
                    Model.findOne({
                        field: 'password', value: input.password
                    }, function(err, row) {
                        if(err) {
                            View.displayError(err)
                        } else {
                            if(row === undefined) {
                                View.displayError('username / password not found')
                            } else {
                                let data = {id: row.id, field: 'isLogin', value: 1}
                                Model.updateData(data, function(err, data) {
                                    if(err) {
                                        View.displayError('failed log in')
                                    } else {
                                        View.displaySuccess('sukses log in')
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }
    static logout(username) {
        Model.findOne({
            field: 'isLogin', value: 1
        }, function(err, row) {
            if(err) {
                View.displayError(err)
            } else {
                if(row === undefined) {
                    View.displayError('tidak ada yang sedang log in')
                } else {
                    let data = {
                        id: row.id, 
                        field: 'isLogin', 
                        value: 0}
                    Model.updateData(data, function(err, data) {
                        if(err) {
                            View.displayError('failed log out')
                        } else {
                            View.displaySuccess('sukses log out')
                        }
                  })  
                }
            }
        })
    }
}

module.exports = Controller