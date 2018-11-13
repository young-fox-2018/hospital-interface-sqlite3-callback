const Patient     = require('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/patient.js')
const Employee    = require('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/employee.js')
const Setup       = require('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/setup.js')
const View        = require('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/views/view.js')
const db          = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/db.js')

class Controller {

  static setup(models){
    switch (models) {
      case 'employee' :
        Setup.generateEmp(models)
        break;
      case 'patient'  :
        Setup.generatePatient(models)
        break
          }
  }
  static findAll(models){
    switch (models) {
      case 'employee':
      Employee.findAll(function(err,data){
        if(err){
          View.showErr(err)
        }else{
          View.showData(data)
        }
      })
      break;
        case 'patient':
        Patient.findAll(function(err,data){
          if(err){
            View.showErr(err)
          }else{
            View.showData(data)
          }
        })
        break;
    }

  }
  static find(tab , col ,keys){
    Employee.find(tab ,col ,keys ,function(err,data){
      if(err){
        View.showErr(err)
      }else{
        View.showData(data)
      }
    })
  }

  static findOne(tab , col ,keys){
    Employee.findOne(tab ,col ,keys ,function(err,data){
      if(err){
        View.showErr(err)
      }else{
        View.showData(data)
      }
    })
  }

  static register(name,position,username,password){
    Employee.register(name,position,username,password,function(err,data){
      if(err){
        View.showErr(err)
      }else{
        View.showData(`selamat ${name} telah terdaftar`)
        View.showData(data)
      }
    })
  }

  static login(username,password){
    Employee.findOne("employee","username",username,function(err,data){
      if (err){
        View.showErr(err)
      }else{
        if(data){
          if(data.password != password){
            View.showErr("Maaf pasword yang anda masukan tidak sesuai")
          }else{
          // User.uodate(id,field)
          let notlogin  =` update employee
                           set login        = 0
                           where login      = 1`
          let login     =` update employee
                           set login        = 1
                           where username   = "${data.username}" `
         db.run(notlogin, function (err) {
           if (err) {
             throw (err)
           }
           })
         db.run(login, function (err) {
           if (err) {
            throw (err)
           }else {
             // cb(null)
           }
            })
            View.showData(`selamata ${data.name} anda berhasil login `)
          }
        }else{
          View.showErr('Username tidak ditemukan ,silahkan lakukan pendaftaran dahulu')
        }
      }
    })
  }

  static update(){

  }

}


module.exports = Controller
