const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./hospital.db")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis 
  }

  static add(name, diagnosis, cb) {
    // cek doc on
    let data =`
    SELECT * FROM employees`
    db.all(data, function(err, rows) {
      if (err) {
        cb({message: "err data"})
      } else {
        let check = false;
        rows.forEach(row => {
          if (row.isLoggedIn === 1 && row.position === 'dokter') {
            check = true;
          }
        });
        if (check === false) {
          cb("tidak memiliki akses untuk add patient")
        } else {
          let quaries =`
          INSERT INTO patients (name, diagnosis)
          VALUES ("${name}", "${diagnosis}")`
          db.run(quaries, function(err) {
            if (err) {
              cb({message: "err add patient", err: err})
            } else {
              let count =`
              SELECT COUNT(*) AS total
              FROM patients`
              db.get(count, function(err, row) {
                if (err) {
                  cb({message: "err count patient", err: err})
                } else {
                  cb(null, row)
                }
              })
            }
          })
        }
      }
    })
  }

}

module.exports = Patient