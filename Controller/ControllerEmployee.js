const View = require("../View/View.js")
const ModelEmployee = require("../Model/ModelEmployee.js")
const ModelPatient = require("../Model/ModelPatient.js")

class ControllerEmployee {
    // static register(name, position, username, password){
    //     ModelEmployee.register(name, position, username, password,function(err,data){
    //         if(err){
    //             View.displayError({
    //                 message: "error register data",
    //                 err: err
    //             })
    //         } else{
    //             ModelEmployee.getAllData("SELECT * FROM Employees",function(err,data2){
    //                 View.displayData(`save data success ${JSON.stringify(data)}.Total employee : ${data2.length}`)
    //             })
    //         }
    //     })
    // }

    static register(name,position,username,password){
        let newEmp = new ModelEmployee(name,position,username,password)

        let options = {
            username: username
        }

        ModelEmployee.findOne(options,function(err,data){
            if(err) {
                View.displayError({
                    message: "error read data Employees",
                    err: err
                })
            } else {
                if(data){
                    View.displayError("Username sudah ada")
                } else {
                    ModelEmployee.create(newEmp.name,newEmp.password,newEmp.position,function(err){
                        if(err){
                            View.displayError(err)
                        } else {
                            ModelEmployee.getAllData(function(err,data){
                                if(err){
                                    View.displayError(err)
                                } else {
                                    View.displayData(`save data success ${JSON.stringify(newEmp)}. Total employee : ${data.length}`)
                                }
                            })
                        }
                    })
                }
            }
        })
    }

    static login(username,password){
        let options = {
            username: username,
            password: password
        }
        ModelEmployee.findOne(options,function(err,data){
            if(err){
                View.displayError(err)
            } else {
                if(data){
                    let option2 = {
                        isLogin : 1
                    }
                    ModelEmployee.update(data.id,option2,function(err){
                        if(err){
                            View.displayError("error update table",err)
                        } else {
                            View.displayData("successfully update table")
                        }
                    })
                    View.displayData(`user ${data.name} logged in successfully`)
                } else {
                    View.displayError("username / password wrong")
                }
            }
        })
    }

    static AddPatient(name,diagnosis){
        let newPatient = new ModelPatient(name,diagnosis)
        let options = {
            position: 'dokter',
            isLogin: 1
        }
        ModelEmployee.findOne(options,function(err,data){
            if(err){
                View.displayError(err)
            } else {
                if(data){
                    ModelPatient.create(newPatient.name,newPatient.diagnosis,function(err){
                        if(err){
                            View.displayError(err)
                        } else {
                            ModelPatient.getAllData(function(err,data){
                                if(err){
                                    View.displayError(err)
                                } else {
                                    View.displayData(`data pasien berhasil ditambahkan. Total data pasien ${data.length}`)
                                }
                            })
                        }
                    })
                } else {
                    View.displayError("Tidak memiliki akses untuk add patient")
                }
            }
        })
    }
}

module.exports = ControllerEmployee