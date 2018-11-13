const db = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/db.js')
class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static findAll(cb){
    const query = `SELECT * FROM employee`
    db.all(query,function(err,data){
      // console.log(data)
      if(err){
        cb(err,null)
      }else{
        cb(null,data)
      }
    })
  }

  static find(tab , col , keys , cb){
    // console.log(typeof keys , typeof col ,typeof tab)
    let query = `SELECT * FROM ${tab} WHERE ${col} like '%${keys}%' `
    db.each(query , function(err,data){
      if(err){
        cb(err,null)
      }else{
        cb(null,data)
      }
    })
  }

  static findOne(tab , col , keys , cb){
    let query = `SELECT * FROM ${tab} WHERE ${col} like '%${keys}%' `
    db.get(query , function(err,data){
      if(err){
        cb(err,null)
      }else{
        cb(null,data)
      }
    })
  }

 static register(name,position,username,password,cb){
   let query = `INSERT INTO employee
                VALUES (null,"${name}","${position}","${username}","${password}",0)`

  db.run(query ,function(err){
    if(err){
      cb(err)
    }else{
      Employee.findAll(function(err,data){
        if(err){
          cb(err,null)
        }else{
          cb(null,data)
        }
      })
    }
  })
 }


 static update(id, field1, ){
  `
    SET field = value
    WHERE id = ${id}
  `
 }

 delete(){

 }


}
module.exports = Employee
