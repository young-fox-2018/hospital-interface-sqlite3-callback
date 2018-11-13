const db = require('../db')

class Employee {
    
    static runner (data, callback) {
        db.run(data, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null, this)
            }
        })
    }

    static findOne (option, callback) {
        let find = 
        `
        SELECT *
        FROM employees
        WHERE "${option.field}" = "${option.value}"
        `
        db.get(find, function(err, rows) {
            if(err) {
                callback(err)
            } else {
                callback(null, rows)
            }
        })
    }

    static update (option, callback) {
        let update = 
        `
        UPDATE employees
        SET isOnline = "${option.login}"
        WHERE "${option.field}" = "${option.value}"
        `
        Employee.runner(update, function(err, data) {
            if(err) {
                callback(err)
            } else {
                callback(null, data)
            }
            db.close()
        })
    }

    static register (username, password, position, callback) {
        let register =
        `
        INSERT INTO employees
            (name, position, username, password, isOnline)
        VALUES 
            ("${username}", "${position}", "${username}", "${password}", "false")
        `
        Employee.runner(register, function(err, data) {
            if(err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    static loginCheck(callback) {
        Employee.findOne({
            field: "isOnline",
            value: 'true'
        }, function(err, data) {
            if(err) {
                callback(err)
            } else {
                if(data) {
                    callback(null, true)
                } else {
                    callback(null, false)
                }
            }
        })
    }

    static login (username, password, callback) {
        Employee.findOne({
            field: "username",
            value: username
        }, function(err, data) {
            if(err) {
                callback(err)
            } else {
                if(data) {
                    if(data.password === password) {
                        Employee.loginCheck(function(err, check) {
                            if(err) {
                                callback(err)
                            } else {
                                if(check === false) {
                                    Employee.update({
                                        field: "username",
                                        value: data.username,
                                        login: "true"
                                    }, function(err) {
                                        if(err) {
                                            callback(err)
                                        } else {
                                            callback(null, data)
                                        }
                                    })
                                } else {
                                    callback(`max login is 1, logout first`)
                                }
                            }
                        })
                    } else {
                        callback(`username / password wrong`)
                    }
                } else {
                    callback(`username / password wrong`)
                }
            } 
        })
    }

    static logout (option, callback) {
        Employee.update({
            field: "username",
            value: option[0],
            login: "false"
        }, function(err, data) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

}

module.exports = Employee