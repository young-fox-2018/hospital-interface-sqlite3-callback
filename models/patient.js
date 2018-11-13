const db = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/db.js')
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  static findAll(cb){
    const query = `SELECT * FROM patient`
    db.all(query,function(err,data){
      // console.log(data)
      if(err){
        cb(err,null)
      }else{
        cb(null,data)
      }
    })
  }
}



module.exports = Patient
