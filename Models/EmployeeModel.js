const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./data.db');


class Employee {

  static register(name, username, password, position, cb) {
    let queryRegister = `
      INSERT INTO employees
      (
        name,
        username,
        password,
        position,
        islogin
      )
      VALUES
      (
        "${name}",
        "${username}",
        "${password}",
        "${position}",
        false
      );`

    db.run(queryRegister, function(err) {
      if (err) {
        cb(err)
      }
      else {
        let queryAll = `
          SELECT username, password, position FROM employees
          ORDER BY id DESC;`
        db.get(queryAll, function(err, row) {
          if (err) {
            cb(err)
          }
          else {
            cb(null,row)
          }
        })
      }
    })
    db.close()
  }

  static login(username, password, cb) {
    let queryisLoginCheck = `
      SELECT islogin FROM employees`
    let loginCheck = true
    db.all(queryisLoginCheck, function(err, rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].islogin === 1) {
          loginCheck = false
        }
      }
      if (loginCheck === true) {
        let queryGetUser = `
        SELECT * FROM employees WHERE username = "${username}"`
        db.get(queryGetUser, function(err, row) {
          if (err) {
            cb(err)
          }
          else {
            let data = row
            if (data.password === password) {
              let queryChangeisLogin = `
              UPDATE employees SET islogin = true`
              db.run(queryChangeisLogin, function(err) {
                if (err) {
                  cb(err)
                }
                else {
                  cb(null, `user ${username} logged in successfully`)
                }
              })
            }
            else {
              cb(`username / password wrong`)
            }
          }
        })
      }
      else {
        cb(null, `masih ada user yang login`)
      }
    })
    db.close()
  }

  static logout(cb) {
    let queryLogout = `UPDATE employees SET islogin = false`
    db.run(queryLogout, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, `all user logged out successfully`)
      }
    })
    db.close()
  }

  static addPatient(patient_name, patient_diagnosis, cb) {
    let queryisLoginCheckDoctor = `SELECT islogin, position FROM employees`
    db.all(queryisLoginCheckDoctor, function(err, rows) {
      if (err) {
        cb(err)
      }
      else {
        let diagnosis = patient_diagnosis.join(" ")
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].islogin === 1 && rows[i].position === "dokter") {
            let queryAddPatient = `
              INSERT INTO patients
              (
                name,
                diagnosis
              )
              VALUES
              (
                "${patient_name}",
                "${diagnosis}"
              );`
            db.run(queryAddPatient, function(err) {
              if (err) {
                cb(err)
              }
              else {
                let queryPatientCount = `
                  SELECT COUNT (*) AS totalPatient FROM patients`
                db.get(queryPatientCount, function(err, rows) {
                  if (err) {
                    cb(err)
                  }
                  else {
                    console.log(rows);
                    cb(null, `data pasien berhasil ditambahkan. Total data pasien : ${rows.totalPatient}`)
                  }
                })
              }
            })
          }
          else {
            cb(null, `silahkan login sebagai dokter`)
          }
        }
      }
    })
    db.close()
  }
}

module.exports = Employee
