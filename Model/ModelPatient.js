const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/hospital.db')

class Patient {
    constructor(name, diagnosis) {
      this.name = name
      this.diagnosis = diagnosis
    }


    static create(name,diagnosis,callback){
      let qInsert = `INSERT INTO Patients(name,diagnosis)
                    VALUES("${name}","${diagnosis}")
                    `
      db.run(qInsert, function(err){
        if(err){
          callback(err)
        } else {
          callback(null)
        }
      })
    }

    static getAllData(callback){
      db.all(`SELECT * FROM Patients`,function(err,data){
        if(err){
          callback(err)
        } else{
          callback(null,data)
        }
      })
    }
  }
module.exports = Patient