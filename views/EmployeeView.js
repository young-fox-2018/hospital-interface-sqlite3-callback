class EmployeeView {
    static displayError(err){
        if(err === '400') {
            console.log(`Error Authentication : you are in loggin, please logout first`)
        }else if(err === '401') {
            console.log(`Error Authentication : username or password wrong`)
        }else if(err === '001') {
            console.log(`Please login first`)
        }else{
            console.log({
                message : err
            })
        }
    }
    static displayRegisterSuccess(newData, data) {
        console.log(`save data success ${JSON.stringify(newData)}. Total employee : ${data.length}`)
    }

    static displayLoginSuccess(data) {
        console.log(`user ${data.username} logged in succesfully`)
    }
    static displayLogoutSuccess(){
        console.log(`you are already logout`)
    }    
    static displayAddSuccess(data){
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
    } 
    static help() {
        console.log(`=== Welcome to Hospital Interface ===
Need help?
[1] 'register': node index.js register username password role
[2] 'login' : node index.js  login username password
case :  error  [403] : You already login with another account
        error  [404] : Username or Password is wrong
ControllerEmployee.login(username, password)
break;
[3] 'addPatient': node index.js addPatient nama_patient sakit_patient
case :  error  [401] : Anda tidak memiliki akses untuk melakukan addPatient
        error  [402] : Anda belum login
[4] 'logout' : node index.js logout
case : error  [402] : Anda belum login
[5] 'help' : node index.js help`)
    }
    
}
module.exports = EmployeeView