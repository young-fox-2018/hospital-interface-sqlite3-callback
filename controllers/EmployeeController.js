const Employee = require('../models/Employee');
const View = require('../views/view')
class EmployeeController {
    static findAll() {
        Employee.findAll((err, data) => {
            if (err) View.error(err)
            else View.printData(data)
        })
    }
    static findAll() {
        Employee.findAll((err, data) => {
            if (err) View.error(err)
            else View.printData(data)
        })
    }
    static insert(data) {
        let obj = {
            name: data[0],
            username: data[0],
            password: data[2],
            role: data[1],
            isLogin: 0
        }
        Employee.insert(obj, (err, data) => {
            if (err) View.error(err)
            else View.printData(data)
        })
    }
    static login(data) {
        let obj = {
            username: data[0],
            password: data[1]
        }
        Employee.login(obj, (err, data) => {
            if (err) View.err('err =>>> ' + err)
            else View.printData(data)
        })
    }
    static logout() {
        Employee.logout(err => {
            if (err) View.error(err)
        })
    }
    static addPatients(data) {
        let name = data[0]
        let diagnosis = data.slice(1).join(' ')
        Employee.addPatient(name, diagnosis, (err, data) => {
            if (err) View.error(err)
            else {
                if (data) {
                    View.printData('Patient berhasil ditambahkan!')
                } else {
                    View.printData('Anda tidak memiliki akses!')
                }
            }
        })
    }
}

module.exports = EmployeeController