const Employee = require('../models/Employees')
const Patient = require('../models/Patients')
const Model = require('../models/model')
const View = require('../views/view')

class Controller {

  static register(uname , pass , role) {
    Employee.register(uname , pass , role, function(err, data){
      if(err) {
        View.displayError(err)
      } else {        
        View.displaySuc(`Save data success ${JSON.stringify(data.newEmp)} \n Total Employee : ${data.length}` )
      }
    })
  }

  static login(uname , pass) {
    Employee.login(uname , pass , function(err , data){
      if (err) {
        View.displayError(err)
      } else {
        if(data == undefined) {
          View.displaySuc(data)
        } else {
          View.displaySuc(`user ${data.username} logged in succesfully`)
        }
        
      }
    })
  }

  static addPatient(name , sick){
    Employee.cekDokter(function(err) {
      if(err){
        View.displayError(err)
      } else {
        Patient.add(name, sick, function(err, data){
          if(err){
            View.displayError(err)
          } else {
            View.displaySuc(`Data pasien berhasil ditambahkan. Total pasien : ${data.length}`)
          }
        })
      }
    })
  }

  static logout(uname) {
    Employee.logout(uname, function(err, dat) {
      if(err) {
        View.displayError(err)
      } else {
        View.displaySuc(`${dat.username} sudah logout`)
      }
    })
  }
}

module.exports = Controller