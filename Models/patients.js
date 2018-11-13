const Employees = require("../Models/employees");
const db = require("./setupDB")


class Patients {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }

  addPatient(params, cb){
    Employees.findOne({
      field: "loggedIn",
      value: 1
    },
    function(err, row){
      if(err){
        cb(err)
      }
      else if(row === undefined){
        cb("You are not logged in")
      }
      else if(row.position !== "doctor"){
        cb("You don't have access to add Patients")
      }
      else{
        let sql = `INSERT INTO Patients
        (name, diagnosis)
        VALUES ("${params.name}", "${params.diagnosis}")`

        db.run(sql, function(err){
          if(err){
            cb(err)
          }
          else{
            cb(err, `successfully added patient ${params.name}`)
          }
        })
      }
    })
  }
}

module.exports = Patients