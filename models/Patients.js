const db = require('../dataBase')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static add(name, sick, cb){
    db.run(`INSERT INTO patients (name, diagnosis) VALUES ("${name}", "${sick}")` , function(err){
      if(err){
        cb(err)
      } else {
        db.all(`SELECT * FROM patients` , function (err, rows) {
          if(err){
            cb(err)
          } else {
            cb(null, rows)
          }
        })
      }
    })
  }
}

module.exports = Patient