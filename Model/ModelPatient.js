const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/hospital.db')

class Patient {
    constructor(name, diagnosis) {
      this.name = name
      this.diagnosis = diagnosis
    }


    static run(sql,callback){
        db.run(sql,function(err,data){
          if(err){
            callback(err)
          } else {
            callback(null,data)
          }
        })
      }
    
    
      static findOne(options,callback){
        let qFind = ``
        for(let key in options){
          qFind += `${key} = "${options[key]}" AND `
        }
        db.get(`SELECT * FROM Patients WHERE ${qFind.slice(0,-4)}`,function(err,data){
          if(err){
            callback(err)
          } else {
            if(data){
              callback(null,data)
            } else {
              callback(null,null)
            }
          }
        })
      }
    
    
      static getAllData(sql,callback){
        db.all(sql,function(err,data){
          callback(null,data)
        })
        db.close()
      }
}


module.exports = Patient