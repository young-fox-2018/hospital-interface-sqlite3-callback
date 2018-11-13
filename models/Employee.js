const db = require('../database/db')

class Employee {
    static findAll(cb) {
        db.all(`SELECT * FROM Employees`, function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }
    static register(name, position, username, password, login, cb) {
        let query = `INSERT INTO Employees
         VALUES (null, "${name}", "${position}", "${username}","${password}", ${login})`
        db.run(query, function (err) {
            if (err) {
                cb(err)
            } else {
                Employee.findAll(function (err, data) {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, data)
                    }
                })
            }
        })
    }

    static login(username, password, cb) {
        let query = `SELECT * FROM Employees
        WHERE username = "${username}" AND password = "${password}"`
        db.get(query, function (err, data) {
            if (err) {
                cb(err)
            } else {
                if (data === undefined) {
                    console.log(`Wrong Username/Password`)
                } else {
                    let userLogin = `UPDATE Employees
                    SET status = 1
                    WHERE username = "${username}" AND password = "${password}"`
                    let otherUser = `UPDATE Employees
                    SET status = 0
                    WHERE status = 1`
                    db.run(otherUser, function (err) {
                        if (err) {
                            cb(err)
                        }
                    })
                    db.run(userLogin, function (err) {
                        if (err) {
                            cb(err)
                        } else {
                            cb(null)
                        }
                    })

                }
            }
        })
    }
    static logout(cb) {
        let userLogout = `UPDATE Employees
            SET status = 0
            WHERE status = 1`
        db.run(userLogout, function (err) {
            if (err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }
}


module.exports = Employee