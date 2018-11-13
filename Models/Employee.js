const db = require('../setupDb')
const Patient = require('./Patient')

class Employee {
  constructor(name, position, password) {
    this.name = name
    this.position = position
    this.username = name
    this.password = password
    this.loggedIn = 0
  }

  static register(input,cb){

    let newE = new Employee(input[0], input[2], input[1]) 

    let queryRegEE = `INSERT INTO Employees( name, position, username, password, loggedIn )
                  VALUES ("${newE["name"]}", "${newE["position"]}", "${newE["username"]}", "${newE["password"]}", "${newE["loggedIn"]}" )`
    
    db.run(queryRegEE, function(err){
      if(err){
        let objErr  = {
                        Message: "Errornya di db.run register",
                        Details: err
                      }
        cb(objErr)
      }
      else{
        cb(null,{
                  data: newE,
                  id: this.lastID
                })
      }
    })
    // db.close()
  }

  static addPatient(input,cb){
    
    let queryDocLoggedIn = `
    SELECT * FROM Employees
    WHERE position = "dokter" AND LoggedIn = 1
    ` 

    Employee.findOne(queryDocLoggedIn,function(err, data){
      if(err){
        cb(err)
      }
      else{
        if(!data){
          cb("Tidak Memiliki Akses untuk Add Patient")
        }
        else{
          let diagnosis = input.slice(1) 
          let newP = new Patient(input[0], diagnosis)
          
          let queryRegP = `INSERT INTO Patients(name, diagnosis)
                      VALUES ("${newP["name"]}", "${newP["diagnosis"]}")`
          db.run(queryRegP, function(err){
            if(err){
              let objErr = {
                              Message: "Errornya di db.run addPatient",
                              Details: err
                          }
              cb(objErr)
            }
            else{
              cb(null, {
                name: newP["name"],
                id :this.lastID
                }
              )
            }
          })
        }
      }
    })
  }

  static findOne(query,cb){
    db.get(query,function(err,data){
      if(err){
        let objErr = {
        Message: "Errornya di db.get findOne",
        Details: err 
        }
        cb(objErr)
      }
      else{
        if(data){
          cb(null, data)
        }
        else{
          cb(null)
        }
      }
    })
    // db.close()
  }
 

  static logIn(input,cb){
    
    let queryCheckerLoggedIn = `
    SELECT * 
    FROM Employees
    WHERE Employees.loggedIn = 1
    `
        
    Employee.findOne(queryCheckerLoggedIn, function(err,data){
      if(err){
        let objErr = {
          Message: "Errornya di findOne Checkerloggedin",
          Details: err
        }
        cb(objErr)
      }
      else{
        if(data){
          cb("Someone logged in already!")          
        }
        else{

          let queryLog =`
          SELECT *
          FROM Employees
          WHERE Employees.name = "${input[0]}" AND Employees.username = "${input[0]}" AND Employees.password = "${input[1]}"
          ` 
          Employee.findOne(queryLog,function(err,data){
            if(err){
              let objErr = {
                Message: "Tidak memiliki Akses untuk addPatient"
              }
              cb(objErr)
            }
            else{
              if(data){
                let queryUpd = `
                UPDATE Employees 
                SET loggedIn = 1
                WHERE username = "${data.username}"
                `
                db.run(queryUpd,function(err){
                  if(err){
                    let objErr = {
                      Message: "Errornya di db.run queryUpd logIn",
                      Details: err
                    }
                    cb(objErr)
                  }
                  else{
                    cb(null, data.name)
                  }
                })
              }
              else{
                cb(null)
              }
            }
          })
        }
      }
    })          
  }

  static logOut(cb){
    let queryLogOut = `
    UPDATE Employees
    SET loggedIn = 0
    `
    
    db.run(queryLogOut,function(err){
      if(err){
        let objErr = {
          Message: "Errornya di logOut",
          Details: err
        }
        cb(objErr)
      }
      else{
        cb(null)
      }
    })
  }



}
  
  module.exports = Employee