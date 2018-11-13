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
          View.displaySuc(`Password/ username salah `)
        } else {
          View.displaySuc(`user ${data.username} logged in succesfully`)
        }
        
      }
    })
  }
}

module.exports = Controller