const Query = require('./Query')

class Employee {
  constructor(name, position, password) {
    this.name = name
    this.position = position
    this.username = this.generateUsername(name)
    this.password = password
    this.islogin = 0
  }

  generateUsername(baseName) {
    baseName = baseName.split('').reverse().join('')
    return baseName
  }

  static setup(callback) {
    let name = `employees`
    let attributes = `id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, position, username TEXT, password TEXT, islogin INTEGER`
    Query.createTable(name,attributes,function(err) {
      if (err) callback(err)
      else callback(null)
    })
  }

  static register(name,position,password,callback) {
    let tabName = 'employees'
    let registerEmp = new Employee(name,position,password)
    Query.addRecord(tabName,registerEmp,function(err,dataProperty) {
      if (err) callback(err,null)
      else callback(null,dataProperty)
    })
  }

  static findAll(callback) {
    Query.findAll("employees",function(err,data) {
      if (err) callback(err,null)
      else callback(null,data)
    })
  }

  static searchData(option,callback) {
    Query.findOne("employees",option.field,option.value,function(err,data) {
      if (err) callback(err,null)
      else callback(null,data)
    })
  }

  static updateData(option,callback) {
    Query.update("employees",option,function(err,data) {
      if (err) callback(err,null)
      else callback(null,data)
    }) 
  }
}

module.exports = Employee
