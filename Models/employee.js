
const fs = require("fs");
const db = require("../db");

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = 0
  }

  static register(name, position, username, password, login, callback) {
    let newData = new Employee(name, position, username, password, login)
    db.serialize(function() {
      let insertEmployee = `INSERT INTO Employees (name, position, username, password, login)
                            VALUES ("${newData.name}", "${newData.position}", "${newData.username}", "${newData.password}", ${newData.login});`
      db.run(insertEmployee, function(err) {
        if(err) {
          callback(err)
        } else {
          let select = `SELECT COUNT(*) AS total FROM Employees`;
          db.get(select, function(err, data){
            if(err) {
              callback(err)
            } else {
              callback(null, newData, data)
            }
          })
        }
      })
    })
  }

  static findOne(callback) {
    let users = `SELECT username, password 
                 FROM Employees`;
    db.all(users, function(err, data){
      if(err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static login(username, password, callback) {
    let selectUsers = `SELECT * FROM Employees`
    db.all(selectUsers, function(err, data){
      if(err) {
        callback(err)
      } else {
        let checkLogin = false;
        for(let i = 0; i < data.length; i++) {
          if(data[i].username === username && data[i].password === password) {
            data[i].login = 1;
            checkLogin = true
          }
          callback(null, data[i])
        }
        if(checkLogin === false) {
          callback("wrong password/username")
        }
      }
    })
  }
}

module.exports = Employee;
