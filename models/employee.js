const db = require("./connectDB")
const Patient = require("./patient")
class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.isLogin = 0
    }

    // add
    static addEmployee(name, position, password, callback) {
        let newData = new Employee(name, position, name, password)
        let query = `INSERT INTO Employees (name, position, username, password, isLogin) 
                     values("${newData.name}", "${newData.position}", "${newData.username}", "${newData.password}", "${newData.isLogin}");`
        db.run(query, function(err) {
            if (err) callback(err, null)
            else {
                callback(null, newData)
            }
        })
    }

    static update(id, field, newValue, callback) {
          Employee.findById(id, function(err, data){
                if (err) callback(err, null)
                else {
                    let updatedData = new Employee(data[0].name, data[0].position, data[0].name, data[0].password)
                    for (const key in updatedData) {
                      if (updatedData.hasOwnProperty(key)) {
                        const element = updatedData[key];
                        if (key == field) {
                            updatedData[key] = newValue
                        }
                      }
                    }
                       
                    let query = `UPDATE Employees SET 
                                name = "${updatedData.name}", 
                                position = "${updatedData.position}", 
                                username = "${updatedData.username}", 
                                password = "${updatedData.password}", 
                                isLogin = "${updatedData.isLogin}"
                                WHERE id = ${id};
                                `
                    db.run(query, function(err) {
                        if (err) callback(err, null)
                        else {
                          callback(null, updatedData)
                        }
                    })
                }
          })
    }

    static findAll(callback) {
        let query = `SELECT * FROM Employees`
        db.all(query, function(err, row) {
            if (err) callback(err, null)
            callback(null, row)
        })
    }

    static findById(id, callback) {
        let query = `SELECT * FROM Employees WHERE id = ${id}`
        db.all(query, function(err,row) {
            if (err) callback(err, null)
            callback(null, row)
        })
    }

    static login(username, password, callback) {
          Employee.findAll(function(err, data) {
            if (err) callback(err, null) // jgn di console log nnti
            else {
                let isLoginState = false
                let id = null
                data.forEach(employee => {
                    if (employee.name == username && employee.password == password) {
                        id = employee.id
                    } 
                    else if (employee.isLogin == 1) {
                        isLoginState = true
                    }             
                });
                if (isLoginState == false) {
                      if (id != null) {
                        Employee.update(id, "isLogin", 1, function(err, updatedData){
                            if (err) callback(err, null)
                            else {
                              callback(null, updatedData)
                            }
                        })
                      } else {
                          callback("Id not found", null)
                      }
                } else {
                      callback("another user has logged in, logged out first", null)
                }
            }
          })
    }

    static logout(callback) {
        Employee.findAll(function(err, data) {
            if (err) callback(err, null)
            else {
                data.forEach(employee => {
                    Employee.update(employee.id, "isLogin", 0, function(err, data) {
                          if (err) callback(err, null)
                    })
                });
                callback(null, "successfully logout")
            }
        })
    }

    static addPatient(patientName, diagnosis, callback) {
        Employee.findAll(function(err, data) {
            if (err) callback(err, null)
            else {
                let login_status = true
                data.forEach(employee => {
                    if (employee.isLogin == 1) {
                        login_status = false
                        if (employee.position == "doctor") {
                              let newPatient = new Patient(patientName, diagnosis, employee.id)
                              
                              let query = `INSERT INTO Patients (name, diagnosis, doctor_id)
                                           values("${newPatient.name}", "${newPatient.diagnosis}", "${newPatient.doctor_id}");`
                              db.run(query, function(err) {
                                  if (err) callback(err, null)
                                  else {
                                    callback(null, newPatient)
                                  }
                              })
                        } else {
                            callback("don't have access to add patient", null)
                        }
                    } 
                });
                if (login_status) {
                    callback("Need to log in first", null)
                }
            }
        })
    }
}


  
module.exports = Employee