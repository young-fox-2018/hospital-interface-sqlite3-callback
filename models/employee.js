const { db } = require('./setup')

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.isLogin = 0
  }

  static findAllEmployees(callback) {
    db.all(`SELECT * FROM employees`,
      function (err, data) {
        if (err) callback(err, null)
        else callback(null, data)
      })
  }

  static findOneEmployee(id, callback) {
    db.all(`SELECT * FROM employees
            WHERE id = ${id}`,
      function (err, data) {
        if (err) callback(err, null)
        else callback(null, data)
      })
  }

  static register(username, password, position, callback) {
    let newEmployee = new Employee(username, password, position)
    db.run(`INSERT INTO employees (username, password, position, isLogin)
            VALUES ("${newEmployee.username}", "${newEmployee.password}", "${newEmployee.position}", ${newEmployee.isLogin})`,
      function (err) {
        if (err) callback(err)
        else {
          Employee.findAllEmployees(function (err, data) {
            if (err) callback(err, null)
            else callback(null, data)
          })
        }
      })
  }

  static login(username, password, callback) {
    Employee.findAllEmployees(function (err, data) {
      if (err) callback(err, null)
      else {
        db.run(`UPDATE employees SET isLogin = 0`,
          function (err) {
            if (err) callback(err)
          })
        let check = false
        data.forEach(element => {
          if (element.username == username && element.password == password) {
            Employee.updateIsLogin(element.id, "isLogin", 1, function (err, data) {
              if (err) callback(err, null)
              else callback(null, data)
            })
            check = true
          }
        });
        if (!check) {
          callback(`Wrong username or password`)
        }
      }
    })
  }

  static logout(callback) {
    Employee.findAllEmployees(function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          if (element.isLogin == 1) {
            Employee.updateIsLogin(element.id, "isLogin", 0, function (err, data) {
              if (err) callback(err, null)
              else callback(null, data)
            })
            check = true
          }
        })
        if (!check) {
          callback(`Please login first!`)
        }
      }
    })
  }

  static updateIsLogin(id, field, newValue, callback) {
    db.run(`UPDATE employees
            SET ${field} = "${newValue}"
            WHERE id = ${id}`,
      function (err) {
        if (err) callback(err)
        else {
          Employee.findOneEmployee(id, function (err, data) {
            if (err) callback(err, null)
            else callback(null, data)
          })
        }
      })
  }

  static updateMyData(field, newValue, callback) {
    Employee.findAllEmployees(function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          if (element.isLogin == 1) {
            db.run(`UPDATE employees
                    SET ${field} = "${newValue}"
                    WHERE id = ${element.id}`,
              function (err) {
                if (err) callback(err)
                else {
                  Employee.findOneEmployee(element.id, function (err, data) {
                    if (err) callback(err, null)
                    else callback(null, data)
                  })
                }
              })
            check = true
          }
        })
        if (!check) {
          callback(`Please login first`)
        }
      }
    })
  }

  static deleteMyAccount(callback) {
    Employee.findAllEmployees(function (err, data) {
      if (err) callback(err, null)
      else {
        let check = false
        data.forEach(element => {
          if (element.isLogin == 1) {
            db.run(`DELETE FROM employees
                    WHERE isLogin = 1`,
              function (err) {
                if (err) callback(err)
                else callback()
              })
            check = true
          }
        })
        if (!check) {
          callback('Please login first!')
        }
      }
    })
  }
}

module.exports = Employee