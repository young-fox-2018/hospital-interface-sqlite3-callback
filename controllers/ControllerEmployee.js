const fs = require('fs')
const Employee = require('../models/Employee')
const Patient = require('../models/Patient')
const EmployeeView = require('../views/EmployeeView')

class EmployeeController {

    static register(params){        
        Employee.register(params, function(err,newData, data){
            if(err) {  
                EmployeeView.displayError(err)
            } else {
                EmployeeView.displayRegisterSuccess(newData, data)
            }
        })
    }

    static login(params) {
        Employee.login(params, function(err, data){
            if(err) {
                EmployeeView.displayError(err)
            } else {
                if(data){
                    if(data === '401') {
                        EmployeeView.displayError('401')
                    } else if(data === '400'){
                        EmployeeView.displayError('400')
                    }
                    else{
                        EmployeeView.displayLoginSuccess(data)
                    }
                }
            }
        })
    }

    static addPatient(params){
        Employee.checkIsLogin(function(err,data){
            if(err){ EmployeeView.displayError(err) } 
            else{
                if(data === undefined){
                    
                }else{
                    if(data.position === 'dokter'){
                        Patient.addPatient(params, function(err){
                                if(err) {
                                    EmployeeView.displayError(err)
                                }else{
                                    Patient.getAll(function(err,data){
                                        if(err){
                                            EmployeeView.displayError(err)
                                        }else{
                                            EmployeeView.displayAddSuccess(data)
                                        }
                                    })
                                }
                        })
                    }
                }
            }
        })
    }

    static logout(){
        Employee.logout(function(err,message) {
            if(err) {
                EmployeeView.displayError(err)
            }else{
                if(message === '001') {
                    EmployeeView.displayError('001')
                }else{
                    EmployeeView.displayLogoutSuccess()
                }
            }
        })
    }

    static help() {
        EmployeeView.help()
    }
}

module.exports = EmployeeController