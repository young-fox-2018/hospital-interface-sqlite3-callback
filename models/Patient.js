const fs = require('fs')
const db = require('../db')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  static getAll(callback)
    {
        const query = `SELECT * FROM Patients`
        db.all(query, function (err, data) {
            if(err){
                callback(err)
            }else{
                callback(null,data)
            }
        });
        db.close()
    }

  static addPatient(params, callback){
      const query = `
                      INSERT INTO Patients (name, diagnose) VALUES ("${params[0]}","${params.slice(1)}")
                    `
      db.run(query, function(err){
        if(err){
          callback(err)
        }
      })
  }
}

module.exports = Patient


