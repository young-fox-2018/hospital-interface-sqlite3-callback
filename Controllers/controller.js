const Employee = require('../Models/Employee')
const Patient = require('../Models/Patient')
const View = require('../View/view')

class Controller {
    static register(option){
       
        Employee.register(option,function(err,data){
            if(err){
                View.displayerror(err)
            }else{
                
                View.displaysuccess(`Save data success ${JSON.stringify(data.newEmp)}. Total employee: ${data.row}`)
            }
        })
    }
    static login(option){
        Employee.login(option,function(err,row){
            if(err){
                View.displayerror(err)
            }else{
                View.displaysuccess(`user ${row.name} logged in successfully `)
            }
        })
    }
    static addpatient(option){
        Employee.addpatient(function(err,data){
            if(err){
                
                View.displayerror(err)
            }else{
                Patient.addpatient(option,function(err,data){
                    if(err){
                        View.displayerror(err)
                    }else{
                        View.displaysuccess(`data pasien berhasil di tambah. total data pasien : ${data}`)
                    }
                })
            }
        })
    }
    static logout(option){
        Employee.logout(option,function(err){
            if(err){
                View.displayerror(err)
            }else{
                View.displaysuccess("anda sudah logout")
            }
        })

    }
}

module.exports = Controller