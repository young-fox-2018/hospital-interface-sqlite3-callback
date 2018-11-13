let db = require('../db')
class Employee {

  static registerEmployee(name, password, role, cb) {

    let insert = `INSERT INTO Employee (
      position,
      username,
      password,
      position,
      isLogin
    ) VALUES (
      "${role}",
      "${name}",
      "${password}",
      "${role}",
      false
    )`
    db.run(insert, function (err) {
      if (err) {
        cb("Username sudah terpakai / kolom tidak terisi")
      } else {
        let leastRegistered = `SELECT username,password, position, COUNT(*) AS Total FROM Employee ORDER BY Id DESC LIMIT 1`
        db.get(leastRegistered, function(err, row) {
          if (err) {
            cb(err)
          } else {
            let username = row.username
            let count = row.Total
            cb(`save data success ${JSON.stringify(row)} Total: ${JSON.stringify(count)}`)
          }
        })
      }
    })
    db.close()
  }

  static loginEmployee(username, password, cb) {
    let insert = `SELECT * FROM Employee
                  WHERE username = "${username}" AND password = "${password}"`
    let loginCheck = `SELECT * FROM Employee WHERE isLogin = true`
    db.get(loginCheck, function (err, row) {
      if (err) {
        cb(err)
      } else {
        if (row == undefined || row == null) {
          db.run(insert, function (err) {
            if (err) {
              cb(err)
            } else {
              db.get(insert, function (err, row) {
                if (err) {
                  throw "ERROR"
                } else {
                  if (row == null || row == undefined) {
                    cb("Salah Username atau Password")
                  } else if (row != null || row != undefined) {
                    let setLogin = `UPDATE Employee SET isLogin = true 
                                    WHERE username = "${username}" AND password = "${password}" `
                    db.run(setLogin, function (err) {
                      if (err) {
                        cb(err)
                      } else {
                        cb("Berhasil login")
                      }
                    })
                  }
                }
              })
            }
          })
          db.close()
        } else if (row != undefined || row != null) {
          cb("ada yang login, kamu tidak bisa login")
        }
      }
    })
  }

  static addPatient(nama, gejala, cb) {
    let employeeCheck = `SELECT * FROM Employee WHERE isLogin = true AND position = "dokter"`
    let patientAdd = `INSERT INTO Patient (
      name,
      diagnosis
    ) VALUES (
      "${nama}",
      "${gejala}"
    )`
    db.get(employeeCheck, function(err, row) {
      if (err) {
        cb(err)
      } else {
        if (row == undefined && row == null) {
          cb("Kamu harus login sebagai dokter")
        } else if (row != undefined && row != null) {
          db.run(patientAdd, function(err) {
            if (err) {
             cb(err)
            } else {
              let queryPatient = `SELECT COUNT(*) AS Total FROM Patient`
              db.get(queryPatient, function(err, row) {
                if (err) {
                  cb(err)
                } else {
                  cb(`Data pasien berhasil ditambahkan, Total Pasien ${row.Total}`)
                }
              })
            }
          })
        }
      }
    })
  }

  static logoutEmployee(username, cb) {
    let logoutQuery = `SELECT * FROM Employee
                      WHERE username = "${username}" AND isLogin = 1`
    db.run(logoutQuery, function (err) {
      if (err) {
        cb(err)
      } else {
        db.get(logoutQuery, function (err, row) {
          if (err) {
            cb(err)
          } else {
            let setLogout = `UPDATE Employee SET isLogin = false
                            WHERE username = "${username}" AND isLogin = 1`
            db.get(setLogout, function (err, row) {
              if (err) {
                cb(`logout gagal ${err}`)
              } else {
                if (row == null || row == undefined) {
                  cb(`Logout berhasil`)
                }
              }
            })
          }
        })
      }
    })
  }
}

module.exports = Employee