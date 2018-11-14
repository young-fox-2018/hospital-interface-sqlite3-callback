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

    static update(id, options, callback) {
            let query = `UPDATE Employees SET `
            for (const key in options) {
                if (options.hasOwnProperty(key)) {
                    const element = options[key];
                    query += key; query += " = "; query += `"${element}"`; query += " , " 
                }
            }
            query = query.slice(0, query.length - 2)
            query += `WHERE id = ${id};`
            db.run(query, function(err) {
                if (err) callback(err, null)
                else {
                  Employee.find("Employees", function(err, data) {
                        if (err) callback(err, null)
                        else {
                            if (data.length >= id) callback(null, "Successfully updated data")
                            else {
                                callback("id not found", null)
                            }
                        }
                  })
                }
            })
    }
  
    static find(table, callback) {
        let query = `SELECT * FROM ${table}`
        db.all(query, function(err, row) {
            if (err) callback(err, null)
            callback(null, row)
        })
    }

    static findOne(table, options, callback) {
        let query = `SELECT * FROM ${table} WHERE `
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let element = options[key];
                query += key 
                query += " = "
                query += `"${element}"`
                query += " AND "
            }
        }
        query = query.slice(0,query.length - 5)
        db.get(query, function(err,row) {
            if (err) callback(err, null)
            callback(null, row)
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



