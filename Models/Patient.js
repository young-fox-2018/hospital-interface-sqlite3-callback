const db = require('../db.js')
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  static getdata(callback){
    const sql = `SELECT * FROM patients`
        db.all(sql,function(err,rows){
            if(err){
                callback(err)
            }else{
                callback(null,rows)
            }

        })

  }
  static addpatient(option,callback){
    let diagnosa = option.slice(1)
    const newpatient = `INSERT INTO patients (name,diagnosa)
                        VALUES ("${option[0]}","${diagnosa}")`
    db.run(newpatient,function(err){
      if(err){
        
        callback(err)
      }else{
        Patient.getdata(function(err,rows){
          if(err){
            callback(err)
          }else{
            callback(null,rows.length)
          }
        })
      }
    })


  }
}

module.exports = Patient