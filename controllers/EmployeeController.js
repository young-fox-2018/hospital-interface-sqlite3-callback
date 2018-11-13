const Employee = require('../models/Employee')
const View = require('../views/view')

class EmployeeController {
    
    static setup() {
        Employee.setup(function(err) {
            if (err) View.errorAlert(err)
            else View.showMessage(`Table Employees created`)
        }) 
    }

    static register(name,position,password) {
        Employee.register(name,position,password,function(err,data) {
            if (err) View.errorAlert(err)
            else View.showMessage(`${data.changes} record inserted into employees`)
        })
        Employee.findAll(function(err,data){
            if(err) View.errorAlert(err)
            else View.showMessage(`Total Employee " ${data.length}`)
        }) 
    }

    static searchData(field,value) {
        let option = {field : field, value:value}
        Employee.searchData(option,function(err,data) {
            if(err) View.errorAlert(err)
            else View.fetchData(data)
        }) 
    }

    static showAll() {
        Employee.findAll(function(err,data) {
            if (err) View.errorAlert(err)
            else View.fetchArrayData(data)
        })
    }

    static updateData(id,field,value) {
        let option = {id:id,field:field,value:value}
        Employee.updateData(option,function(err,data) {
            if (err) View.errorAlert(err)
            else View.showMessage(`${data.changes} record updated on employees`)
        })
    }
}

module.exports = EmployeeController