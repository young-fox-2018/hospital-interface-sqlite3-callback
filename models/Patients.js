const db = require('../db')

class Patient {

  static runner (data, callback) {
    db.run(data, function(err) {
      if(err) {
        callback(err)
      } else {
        callback(null, this)
      }
    })
  }

  static addPatient (option, callback) {
    let diagnosis = option.slice(1).join(' ')
    let add = 
    `
    INSERT INTO patients
      (name, diagnosis)
    VALUES
      ("${option[0]}", "${diagnosis}")
    `
    Patient.runner(add, function(err, data) {
      console.log("BERHASIL NAMBAHIN")
      if(err) {
        callback(err)
      } else {
        callback(null, data.lastID)
      }
    })
    db.close()
  }

}

module.exports = Patient
