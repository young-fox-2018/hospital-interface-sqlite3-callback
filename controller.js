const Employee = require('./Models/EmployeeModel.js')
const Patient = require('./Models/PatientModel.js')
const View = require('./view.js')

class Controller {
  static register(name, username, password, position) {
    if (name === undefined || username === undefined || password === undefined || position === undefined) {
      View.viewData('isian belum lengkap, harap isi dengan format <name> <username> <password> <position>')
    }
    else {
      let data = Employee.register(name, username, password, position, function(err, data) {
        if (err) {
          View.viewError(err)
        }
        else {
          View.viewSuccess(`save data success ${JSON.stringify(data)}`)
        }
      })
    }
  }

  static login(username, password) {
    let data = Employee.login(username, password, function(err, data) {
      if (err) {
        View.viewError(err)
      }
      else {
        View.viewSuccess(data)
      }
    })
  }

  static addPatient(patient_name, patient_diagnosis) {
    Employee.addPatient(patient_name, patient_diagnosis, function(err, data) {
      if (err) {
        View.viewData(err)
      }
      else {
        View.viewSuccess(data)
      }
    })
  }

  static logout() {
    Employee.logout(function(err, data) {
      if (err) {
        View.viewError(err)
      }
      else {
        View.viewSuccess(data)
      }
    })
  }
}

module.exports = Controller