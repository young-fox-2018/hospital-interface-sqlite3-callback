const Employees = require("../Models/employees")
const Patients = require("../Models/patients")
const View = require("../Views/view")

class Controller {

    static register(username, password, position){
        let newEmployee = new Employees(username, password, position)
        newEmployee.register(function(err, data){
            if(err){
                View.displayError(err)
            }
            else{
                View.displaySuccess(data)
            }
        })
    }

    static login(username, password){

        Employees.login({
            username: username,
            password: password},
            function(err,data){
                if(err){
                    View.displayError(err)
                }
                else{
                    View.displaySuccess(data)
                }
            }
            )
    }

    static find(field, value){
        Employees.findOne({
            field: field,
            value: value
        },
        function(err, data){
            if(err){
                View.displayError(err)
            }
            else{
                View.displaySuccess(data)
            }
        })
    }

    static addPatient(patienName, diagnosis){
        let newPatient = new Patients(patienName, diagnosis)
        newPatient.addPatient(newPatient,function(err, data){
            if(err){
                View.displayError(err)
            }
            else{
                View.displaySuccess(data)
            }
        })
    }
}

module.exports = Controller;