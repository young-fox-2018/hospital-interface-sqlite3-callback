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
        Employee.findOne({
            field: "is_loggin",
            value: 1
        }, function(err, data){
            if(err){
                EmployeeView.displayError(err)
            } else{
                if(!data){
                    var input = [{
                        field: "username",
                        value: params[0]
                    },{
                        field: "password",
                        value: params[1]
                    }]
                    Employee.findOne(input[0], function(err, data){
                        if(err){
                            EmployeeView.displayError(err)
                        } else{
                            if(data){
                                if(data.password === input[1].value){
                                    const updateInput ={
                                        id: data.id,
                                        field: "is_loggin",
                                        value: 1
                                    }
                                    Employee.update(updateInput, function(err){
                                        if(err) {
                                            EmployeeView.displayError(err)
                                        }else{
                                            EmployeeView.displayLoginSuccess(data)
                                        }
                                    })
                                }
                                else{
                                    EmployeeView.displayError(401)
                                }
                            }else{
                                EmployeeView.displayError(401)
                            }
                        }
                    })
                } else{
                    EmployeeView.displayError(400)
                }
            }
        })
    }

    static addPatient(params){
        Employee.findOne({
            field: "is_loggin",
            value: 1
        }, function(err, data){
            if(err){
                EmployeeView.displayError(err)
            } else {
                if(data){
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
                    }else{
                        EmployeeView.displayError('002')
                    }
                }else{
                    EmployeeView.displayError('001')
                }
            }
        })
    }

    static logout(){
        Employee.findOne( { field: "is_loggin", value: 1 }, function(err, data){
            if(err){
                EmployeeView.displayError(err)
            } else{
                if(data){
                    const updateInput ={
                        id: data.id,
                        field: "is_loggin",
                        value: 0
                    }
                    Employee.update(updateInput, function(err){
                        if(err) {
                            EmployeeView.displayError(err)
                        }else{
                            EmployeeView.displayLogoutSuccess(data)
                        }
                    })
                }
                else{
                    EmployeeView.displayError('001')
                }
            }
        }) 
    }

    static help() {
        EmployeeView.help()
    }
}

module.exports = EmployeeController