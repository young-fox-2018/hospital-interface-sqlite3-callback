
const { db } = require("./db")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

class Model {
  static menu(cb) {
    let menu = `
  node index registerEmployee name position username password
  node index registerPatient name diagnosis
  node index login username password
  node index logout username
    `
    cb(menu)
  }

  static addEmployee(name, position, username, password, cb) {
    let employeeValidation = `SELECT * FROM employee
                              WHERE username = "${username}"`
    db.all(employeeValidation, function (err, data) {
      if (err) cb(err)
      else {
        let employeeValidation = data
        if (employeeValidation.length === 1) {
          cb("employee registration fail, username already exists!")
        } else if (employeeValidation.length === 0) {
          let query = `INSERT INTO employee (name,position,username,password)
                       VALUES ("${name}","${position}","${username}","${password}")`
          db.all(query, function (err, data) {
            if (err) cb(err, null)
            else cb(null, "employee register success!")
          })
        } else {
          cb("bug di registerEmployee validation")
        }
      }
    })
  }
  static addPatient(name, diagnosis, cb) {
    let doctorValidation = `SELECT position FROM employee
                            WHERE loginStatus = 1`
    db.all(doctorValidation, function (err, data) {
      if (err) cb(err)
      else {
        let validation = data
        if(validation.length === 0) {
          cb(`>>> Patient registration failed!
>>> patient registration needs a doctor validation
>>> please call the nearest doctor in case you are not a doctor!`)
        } else if (validation[0].position !== "doctor") {
          cb(`>>> You DO NOT HAVE the permission to register a patient.
>>> You will be reported for violating the rules!`)
        } else if(validation[0].position == "doctor"){
          let patientValidation = `SELECT * FROM patient
                                   WHERE name = "${name}"`
          db.all(patientValidation, function (err, data) {
            if (err) cb(err)
            else {
              let patientValidation = data
              if (patientValidation.length === 1) {
                cb("patient registration fail, patient has already been registered!")
              } else if (patientValidation.length === 0) {
                let query = `INSERT INTO patient (name,diagnosis)
                             VALUES ("${name}","${diagnosis}")`
                db.run(query, function (err, data) {
                  if (err) cb(err, null)
                  else cb(null, "patient has been registered!")
                })
              } else {
                cb("bug di registerPatient validation")
              }
            }
          })
        }
      }
    })
  }
  static freshStart(cb) {
    let dropEmployee = `DROP TABLE IF EXISTS employee`
    let dropPatient = `DROP TABLE IF EXISTS patient`
    let queryEmployee = `CREATE TABLE IF NOT EXISTS employee(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      loginStatus REAL NOT NULL DEFAULT 0)`

    let queryPatient = `CREATE TABLE IF NOT EXISTS patient(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        diagnosis TEX NOT NULL)`
    db.serialize(function () {
      db.run(dropEmployee)
      db.run(dropPatient)
      db.run(queryEmployee, function (err) {
        if (err) cb(err, null)
        else cb(null, "employee table creation success")
      })

      db.run(queryPatient, function (err) {
        if (err) cb(err, null)
        else {
          data =
            cb(null, "patient table creation success")
        }
      })
    })
  }

  static login(username, password, cb) {
    let checkQuery = `SELECT * FROM employee
    WHERE (username = "${username}" AND password = "${password}")`
    let loginValidationQuery = `SELECT * FROM employee
                                WHERE loginStatus = 1`
    db.all(checkQuery, function (err, data) {
      if (err) throw (err, null)
      else {
        db.all(loginValidationQuery, function (err, result) {
          if (err) cb(err)
          let arr = data
          let loggedIn = result
          if (arr.length === 1) {
            if (arr[0].loginStatus === 0) {
              let loginQuery = `UPDATE employee
              SET loginStatus = 1
              WHERE id = ${arr[0].id}`
              db.run(loginQuery, function (err) {
                if (err) cb(err, null)
                else cb(null, "login success!")
              })
            } else {
              if (loggedIn[0].username == username) {
                cb("you already signed in!")
              } else if (loggedIn[0].username !== username) {
                cb(`user ${loggedIn[0].username} has to logged out first`)
              } else {
                cb("bug on login validation")
              }
            }
          } else if (arr.length === 0) {
            let checkUserQuery = `SELECT * FROM employee
                                  WHERE username = "${username}"`
            db.all(checkUserQuery, function (err, data) {
              if (err) cb(err)
              else {
                let result = data
                if (result.length !== 0) {
                  cb("username or password is wrong")
                } else {
                  cb("user does not exists, please register first!")
                }
              }
            })
          }
        })
      }
    })
  }

  static logout(username, cb) {
    let checkoutQuery = `UPDATE employee
    SET loginStatus = 0
    WHERE username = "${username}"`
    let checkQuery = `SELECT * FROM employee
                      WHERE username = "${username}"`
    db.all(checkQuery, function (err, data) {
      if (err) cb(err)
      else {
        let arr = data
        if (arr.length === 0) {
          cb("you have not logged in!")
        } else {
          db.run(checkoutQuery, function (err) {
            if (err) cb(err, null)
            else cb(null, `User ${username} has been logged out!`)
          })
        }
      }
    })
  }
}


module.exports = {
  Patient: Patient,
  Employee: Employee,
  Model: Model
}