const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/hospital.db')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  // static register(name, position, username, password,callback){
  //   let newEmployee = new Employee(name, position, username, password)

  //   let qInsertData = `
  //   INSERT INTO Employees(name,position,username,password,islogin)
  //   VALUES("${newEmployee.name}","${newEmployee.position}","${newEmployee.name}","${newEmployee.password}",0)
  //   `

  //   db.run(qInsertData,function(err,data){
  //     if(err){
  //       callback(err)
  //     } else {
  //       callback(null,newEmployee)
  //     }
  //   })
  // }

  static create(name,password,position,callback){
    let qInsert = `INSERT INTO Employees(name,position,username,password,islogin)
                  VALUES("${name}","${position}","${name}","${password}",0)
                  `
    
    db.run(qInsert, function(err){
      if(err){
        callback(err)
      } else {
        callback(null)
      }
    })
  }

  static findOne(options,callback){
    let qFind = ``
    for(let key in options){
      if(typeof options[key] === 'number'){
        qFind += `${key} = ${options[key]} AND `
      } else {
        qFind += `${key} = "${options[key]}" AND `
      }
    }
    db.get(`SELECT * FROM Employees WHERE ${qFind.slice(0,-4)}`,function(err,data){      
      if(err){
        callback(err)
      } else {
        if(data){
          callback(null,data)
        } else {
          callback(null,null)
        }
      }
    })
  }


  static getAllData(callback){
    db.all(`SELECT * FROM Employees`,function(err,data){
      if(err){
        callback(err)
      } else{
        callback(null,data)
      }
    })
  }

  // static login(username,password,callback){
  //   Employee.getAllData(`SELECT * FROM Employees WHERE isLogin = 1`,function(err,data){
  //     let dataEmployeeLogin = data
  //     if(dataEmployeeLogin.length > 0){
  //       callback("Sudah ada user login")
  //     } else {
  //       // console.log("belum ada yang login nih")
  //       // console.log([username,password])
  //       db.get(`SELECT * FROM Employees WHERE username = "${username}" AND password = "${password}"`,function(err,data){
  //         if(err){
  //           callback(err)
  //         } else {
  //             if(data){
  //               Employee.run(`UPDATE Employees SET isLogin = 1 WHERE username = "${username}" AND password = "${password}"`,function(err,data){
  //                 // console.log("ini err", err)
  //                 // console.log("ini data", data)
  //                 if(err){
  //                   callback(err)
  //                 } else {
  //                   callback(null, `user ${username} logged in successfully`)
  //                 }
  //               })
  //             } else {
  //               callback("username/password wrong")
  //             }
  //         }
  //       })
  //     }
  //   })
  // }

  static update(id,options,callback){
    let qFind = ``
    for(let key in options){
      if(typeof options[key] === 'number'){
        qFind += `${key} = ${options[key]}`
      } else {
        qFind += `${key} = "${options[key]}"`
      }
    }
    db.run(`UPDATE Employees SET ${qFind} WHERE id = ${id}`,function(err){
      if(err){
        callback(err)
      } else {
        callback(null)
      }
    })
  }

}

module.exports = Employee
