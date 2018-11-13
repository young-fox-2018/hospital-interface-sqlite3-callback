const fs = require('fs')
const db = require('../db')

class Employee {
    constructor(username, password, position) {
      this.username = username
      this.password = password
      this.position = position
      this.login = false
    }

    static getAll(callback)
    {
        const query = `SELECT * FROM Employees`
        db.all(query, function (err, data) {
            if(err){
                callback(err)
            }else{
                callback(null,data)
            }
        });
        db.close()
    }

    static  findOne(params, callback){
        const query = `SELECT * FROM Employees WHERE username = "${params[0]}" AND password = "${params[1]}";`
        db.get(query, function(err,data){
            if(err) {
                callback(err)
            }else{
                callback(null, data)
            }
        })
    }

    static checkIsLogin(callback){
        const query = `SELECT * FROM Employees WHERE is_loggin = 1;`
        db.get(query, function(err,data){
            if(err) {
                callback(err)
            }else{
                callback(null, data)
            }
        })
    }
    
    static register(params, callback) {
        const query = `INSERT INTO Employees (username, password, position) VALUES ("${params[0]}", "${params[1]}", "${params[2]}")`
        const newData = new Employee(params[0],params[1],params[2])
        db.serialize(function(){
            db.run(query, function (err) {
                if (err) {
                    callback(err)
                } else{
                    console.log("data registered")
                    Employee.getAll(function(err,data){
                        if(err) {
                            callback(err)
                        }else{
                            callback(null, newData,data)
                        }
                    })
                }
            });
        })
    }

     static login(params, callback) {
        Employee.checkIsLogin(function(err,data){
            if(err) { callback(err) }
            else {
                if(data === undefined){
                    Employee.findOne(params, function(err,data){
                        if(err) {
                            callback(err)
                        }else{
                            if(data){
                                const user = new Employee(params[0],params[1],params[2])
                                const query = `UPDATE Employees SET is_loggin = 1 WHERE username LIKE "${data.username}" AND password LIKE "${data.password}";`
                                db.run(query, function(err) {
                                    if (err) {
                                        callback(err)
                                    }else{
                                        callback(null, user)
                                    }
                                });
                            }else{
                               callback(null,'401')
                            }
                        }
                    })
                } else {
                    callback(null, '400')
                }
            }
        })
    }

    static logout(callback){
        Employee.checkIsLogin(function(err,data){
            if(err){
                callback(err)
            }else{
                if(data === undefined){
                    callback(null,'001')
                }else{
                    const query = `UPDATE Employees SET is_loggin = 0 WHERE id = ${data.id};`
                    db.run(query, function(err) {
                        if (err) {
                            callback(err)
                        }else{
                            callback(null, null)
                        }
                    });
                }
            }
        })
    }

  }

  module.exports = Employee