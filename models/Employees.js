"use strict"

const db = require('./Database.js')

class Employee {
    constructor(name, password, role, age) {
        this.name = name
        this.password = password
        this.age = age
        this.role = role
        this.age = age
    }

    static insertData(userInfo, cb) {
        let user = new Employee(userInfo.name, userInfo.password, userInfo.role,  userInfo.age)
        const statement = db.prepare(`INSERT INTO Employees(name , role , password, age, loggedIn)
                                        VALUES(? ,?, ?, ?, ?)`)

        statement.run(user.name, user.role, user.password, user.age, 0, err => {
            if (err) {
                cb({
                    error : err,
                    message : 'Failed to insert employee data'
                })
            } else {
                cb(null, user)
            }

            // db.close()
        })
    }

    static getTotal(cb) {
        const statement = db.prepare(`SELECT COUNT(*) as totalEmployees FROM Employees`)
        statement.get((err, row) => {
            if(err) {
                cb(err)
            } else {
                cb(null, row)
            }
        })
    }

    static findOne(field, value, cb) {
        const statement = db.prepare(`SELECT id,name, password, role FROM Employees WHERE ${field} = ?`)
        statement.get(value, (err, row) => {
            if (err) {
                cb(err)
            } else {
                cb(null, row)
            }

            db.close()
        })
    }

    static check(userInfo, field1, field2, cb) {
        const statement = db.prepare(`SELECT 1 FROM Employees WHERE ${field1} = ? AND ${field2} = ?`)
        statement.get(userInfo.field1, userInfo.field2, (err, row) => {
            if (err) {
                cb(err)
            } else {
                cb(null , row)
            }
        })
    }

    static update(identifier, identifierValue, field, value, cb) {
        const statement = db.prepare(`UPDATE employees
                                        SET ${field} = ?
                                            WHERE ${identifier} = ? `)
        
        statement.run(value, identifierValue, err => {
            if (err) {
                cb(err)
            } else {
                cb(null, identifierValue)
            }
        })
    }
}

module.exports = Employee