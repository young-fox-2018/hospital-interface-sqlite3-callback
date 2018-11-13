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

  static getOne(param, cb) {
    db.get(`SELECT * FROM employees WHERE ${param.field} = "${param.value}"`, function(err, rows) {
      if(err) {
        cb(err)
      } else{
        cb(null, rows)
      }
    })
  }

  static login(uname, pass ,cb) {
    let query = ` UPDATE employees SET login = 1 WHERE password = "${pass}" `

    Employee.getOne({field : 'login' , value: 1} , function(err, rows){
      if(err){
        cb(err)
      } else {
        if(rows !== undefined) {
          cb('Log out first')
        } else {
          Employee.getOne({field:"username", value: `${uname}`}, function(err, rows) {
            if(err){
              cb(err)
            } else {
              if (rows == undefined) {
                cb(`username salah`)
              } else {
                if (rows.password == pass) {
                  Employee.execute(query, function(err){
                    if(err) {
                      cb(err)
                    } else {
                      cb(null, rows)
                    }
                  })
                } else {
                  cb(`password salah`)
                }
              }
            }
          } )
        }
      }
    })
    db.close()
  }

  static cekDokter(cb) {
    Employee.getOne({field: "login", value:1} , function(err, rows) {
      if(err) {
        cb(err)
      } else {
          if(rows == undefined) {
            cb(`login first`)
          } else {
            if(rows.position !== "dokter") {
              cb(`You don't have access`)
            } else {
              cb(null)
            }
          }
      }
    })
  }

  static logout(uname , cb){
    Employee.getOne({field: "username" ,value:uname} , function(err, rows) {
      if(err){
        cb(err)
      } else {
        if(rows == undefined) {
          cb(`Anda tidak login`)
        } else {
          Employee.execute(`UPDATE employees SET login = 0 WHERE username = "${uname}"` , function(err){
            if(err){
              cb(err)
            } else {
              cb(null, rows)
            }
          })
        }
      }
    })
  }
  
}

module.exports = Employee