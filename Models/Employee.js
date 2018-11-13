const db = require('../Database/db')


class Employee {
    constructor(username, password, position) {
        this.name = username
        this.position = position
        this.username = username
        this.password = password
        this.status = 0
    }
    static findAll(callback) {
        let query = `SELECT * FROM employees`
        db.all(query, (err, row) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, row)
            }
        })
    }
    static findOne(table, field, input, callback) {
        let query = `SELECT * FROM ${table} WHERE ${field}='${input}'`
        db.get(query, (err, row) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, row)
            }
        })
        // db.close()
    }
    static delete(table, field, input, callback) {
        let query = `DELETE FROM ${table} WHERE ${field}=${input}`
        db.run(query, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
    static updateData(table, id, field, newData, callback) {
        let query = `UPDATE ${table} SET ${field}='${newData}' WHERE id=${id}`
        db.run(query, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
    static register(username, password, position, callback) {
        let query = `INSERT INTO employees (username,password,role) VALUES('${username}','${password}','${position}')`
        db.run(query, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
        db.close()
    }
    static login(user, password, callback) {
        this.findOne('employees', 'status', 1, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (!data) {
                    this.findOne('employees', 'username', user, (err, data) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (data.password === password) {
                                this.updateData('employees', data.id, 'status', 1, (err) => {
                                    if (err) {
                                        callback(err)
                                    } else {
                                        callback(null, `User ${user} logged in succesfully!`)
                                    }
                                })
                            } else {
                                callback(`Your password is wrong!`, null)
                            }
                        }
                    })
                } else {
                    if (data.username === user) {
                        callback(null, `You are logged in now!`)
                    } else {
                        callback(null, `There is other user login now!`)
                    }
                }

            }
        })

    }
    static logout(user, callback) {
        this.findOne('employees', 'username', user, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                if (data) {
                    if (data.username === user && data.status === 1) {
                        this.updateData('employees', data.id, 'status', 0, (err) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(null, `User ${user} has been log out!`)
                            }
                        })
                    } else {
                        callback(null, `This user is not logged in status!`)
                    }
                } else {
                    callback(null, `Your username is false!`)
                }
            }
        })
    }
    static addPatient(newPatient, callback) {
        // console.log(newPatient)
        let query = `INSERT INTO patients (name,diagnosis)VALUES ('${newPatient.name}','${newPatient.diseases}')`
        db.run(query, (err) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, null)
            }
        })

    }


}



module.exports = Employee