const db = require('../dataBase')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static execute(sql , callback) {
    db.run(sql, function(err){
      if(err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  }

  static getAll(table, cb) {

    db.all(`SELECT * FROM ${table}`, function(err, rows){
      if(err) {
        cb(err)
      } else {
        cb(null, rows)
      }
    })
  }

  static register(uname, pass , role, cb) {
    let newEmp = {
      "username": `${uname}`,
      "password": `${pass}`,
      "role":`${role}`
    }

    let query = `
    INSERT INTO employees (username, password , position) VALUES ("${uname}" , "${pass}", "${role}")
    `

    Employee.execute(query , function(err) {
      if(err){
        cb(err)
      } else {
        Employee.getAll('employees' , function(err , data){
          if(err) {
            cb(err)
          } else {
            let yangDikirim = {
              newEmp: newEmp,
              length: data.length
            }
            cb(null, yangDikirim)
          }
        })
        // cb(null,data)
      }
    })
    db.close()
  }

  static getOne(param) {
    db.get(`SELECT * FROM employees`)
  }

  static login(uname, pass ,cb) {
    let query = ` UPDATE employees SET login = 1 WHERE username = "${uname}" AND password = "${pass}" `

    db.get(`SELECT * FROM employees WHERE username = "${uname}" AND password = "${pass}"` , function(err, rows) {
      if(err){
        cb(err)
      } else {
        Employee.execute(query , function(err) {
          if(err) {
            cb(err)
          } else {
            cb(null , rows)
          }
        })
      }
    } )
  }

}

module.exports = Employee