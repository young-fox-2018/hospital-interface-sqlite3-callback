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
        let qInsert = `INSERT INTO Employees(name,position,username,password,islogin)
                        VALUES("${newEmp.name}","${newEmp.position}","${newEmp.name}","${newEmp.password}",0)
                        `
        ModelEmployee.run(qInsert,function(err,data){
            if(err){
                View.displayError({
                    message: "error register data",
                    err: err
                })
            } else{
                ModelEmployee.getAllData("SELECT * FROM Employees",function(err,data2){
                    View.displayData(`save data success ${JSON.stringify(newEmp)}.Total employee : ${data2.length}`)
                })
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
                    ModelPatient.run(`UPDATE Employees SET isLogin = 1 WHERE username = "${username}" AND password = "${password}"`,function(err,data){
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
                    let qInsert = `INSERT INTO Patients(name,diagnosis)
                        VALUES("${newPatient.name}","${newPatient.diagnosis}")
                        `
                    ModelPatient.run(qInsert,function(err,data){
                        if(err){
                            View.displayError(err)
                        } else {
                            ModelPatient.getAllData("SELECT * FROM Patients",function(err,data2){
                                View.displayData(`data pasien berhasil ditambahkan. Total data pasien ${data2.length}`)
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








// View.displayError("tidak memiliki akses untuk add patient")