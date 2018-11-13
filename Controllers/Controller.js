const View = require('../Views/view')
const Employee = require('../Models/Employee.js')


class Controller{
    static execute(cmd, input){
        switch (cmd[0]) {
            case "register":
                Employee.register(input, function(err,data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(`Save data successful ${JSON.stringify(data.data)}. Total employee : ${data.id}`)
                    }
                })
            break;

            case "addPatient":
                Employee.addPatient(input,function(err,data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(`${data.name} berhasil ditambahkan ke database Patients. Total data pasien: ${data.id}`)
                    }
                })
            break;

            case "login":
                Employee.logIn(input, function(err,data){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        if(data){
                            View.display(`${data} berhasil login`)
                        }
                        else{
                            View.displayError("Username/Password yang di masukkan salah!")
                        }
                    }
                })
            break;
            
            case "logout":
                Employee.logOut(function (err){
                    if(err){
                        View.displayError(err)
                    }
                    else{
                        View.display(`logout berhasil!`)
                    }
                })
            break;
                
            default: View.help()
                break;
        }
    }
}

module.exports = Controller