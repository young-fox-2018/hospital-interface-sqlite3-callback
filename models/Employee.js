const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
  static findAll(cb) {
    let query = `SELECT name, username, role, isLogin FROM employees`
    db.serialize(() => {
      db.all(query, (err, rows) => {
        if (err) cb(err)
        else {
          cb(null, rows)
        }
      })
    })
    // db.close()
  }
  static insert(data, cb) {
    let query = `INSERT INTO employees (name, username, password, role, isLogin)
                  VALUES ("${data.name}", "${data.username}", "${data.password}", "${data.role}", "${data.isLogin}")`
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) cb(err)
        else cb(null,'Data successfully inserted!')
      })
    })
    // db.close()
  }
  static validasiAkun(data, cb) {
    let query = `SELECT * FROM employees WHERE username = "${data.username}" AND password = "${data.password}"`
    db.serialize(() => {
      db.get(query, (err, row) => {
        if (err) cb(err)
        else cb(null, row)
      })
    })
    // db.close()
  } 

  static logout(cb) {
    let query = `UPDATE employees SET isLogin = 0`
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) cb(err)
        else cb(null) 
      })
    })
  }

  static login(data, cb) {
    this.validasiAkun(data, (err, row) => {
      if (err) cb(err)
      else {
        let obj = row
        let query = `UPDATE employees 
                      SET isLogin = 1 
                      WHERE id = ${obj.id}`
        db.serialize(() => {
          db.run(query, err => {
            if (err) cb(err + ' err dari update')
            else cb(null,'sudah login')
          })
        })
        // db.close()
      }
    })
  }
  static addPatient(name, diagnosis, cb) {
    let queryGet = `SELECT * FROM employees WHERE isLogin = 1 AND role = "dokter"`
    let queryCreate = `INSERT INTO patients (name, diagnosis)
                        VALUES ("${name}", "${diagnosis}")`
    db.serialize(() => {
      db.get(queryGet, (err, row) => {
        if (err) cb(err + "<= bukan dokter")
        else {
          if (row !== undefined) {
            db.run(queryCreate, err => {
              if (err) cb(err)
              else cb(null, [])
            })
          } else {
            cb(null, null)
          }
        }
      })
    })
  }
}

module.exports = Employee