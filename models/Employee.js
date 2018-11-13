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

    static update(params, callback){
        const query = `UPDATE Employees SET ${params.field} = ${params.value} WHERE id = ${params.id}`
        db.run(query, function(err){
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }

    static  findOne(params, callback){
        const query = `SELECT * FROM Employees WHERE ${params.field} = "${params.value}";`
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
  }

  module.exports = Employee