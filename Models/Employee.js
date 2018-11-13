const db = require('../db')

class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }
    static execute(query,callback){
        db.run(query,function(err){
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        });
      

    }
    static register(option,callback){
        const insertEmployee = `INSERT INTO Employees (name,username,password,position)
                                VALUES ("${option[0]}","${option[1]}","${option[2]}","${option[3]}")`
        const obj = {
            "username": `${option[1]}`,
            "password": `${option[2]}`,
            "role": `${option[3]}`

                 }
        Employee.execute(insertEmployee,function(err){
            if(err){
                callback(err)
            }else{
                Employee.getData(function(err,rows){
                    if(err){
                        callback(err)
                    }else{
                        let data = {
                            newEmp : obj,
                            row: rows.length
                        }
                        callback(null,data)
                    }
                })
                
            }
        })
        db.close()

    }
    static getData(callback){
        const sql = `SELECT * FROM Employees`
        db.all(sql,function(err,rows){
            if(err){
                callback(err)
            }else{
                callback(null,rows)
            }

        })
    }
    static findone(option,callback){
        const sql = `SELECT * FROM Employees WHERE ${option.key} = "${option.value}"`
        db.get(sql,function(err,row){
            if(err){
                callback(err)
            }else{
                
                callback(null,row)
            }
        })
    }
    static login(option,callback){
        let checklog = {
            key: "login",
            value: 1
        }
        let obj = {
            key: "username",
            value: `${option[0]}`
        }
        Employee.findone(checklog,function(err,row){
            if(err){
                callback(err)
            }else {
                if(row !== undefined){
                    callback("yg login cuma boleh satu")
                }else{

                    Employee.findone(obj,function(err,row){
                        if(err){
                            callback(err)
                            
                        }else{
                            if(row === undefined){
                                callback(err)
                            }else{
                                if(row.password === option[1]){
                                    
                                    const update = `UPDATE Employees SET login = 1
                                                    WHERE username = "${obj.value}"`
                                    const data = row
                                    Employee.execute(update,function(err){
                                        if(err){
                                            callback(err)
                                        }else{
                                            callback(null,data)
                                        }
                                    })
                                }else{
                                    callback('password salah')
                                }
                            }
                        }
                    })
                }
            }
        })


    }

    static addpatient(callback){
        let obj = {
            key:"login",
            value:1
        }
       Employee.findone(obj,function(err,row){
            if(err){
                callback(err)
            }else{
                if(row === undefined){
                    callback(`silahkan login terlebih dahulu`)
                }else{
                    if(row.position === "dokter"){
                        callback(null,row)
                    }else{
                        
                        callback(`tidak memiliki akses untuk addpatient`)
                    }
                }
            }
       })

       
    }
    static logout(option,callback){
        let obj = {
            key: "username",
            value: option[0]
        }
        Employee.findone(obj,function(err,row){
            if(err){
                callback(err)
            }else{
                if(row.login !== 1){
                    callback(`anda tidak login`)
                }else{
                    const update = ` UPDATE Employees SET login = 0 WHERE username = "${row.username}"`
                    Employee.execute(update,function(err){
                        if(err){
                            callback(err)
                        }else{
                            callback(null)
                        }
                    })
                }
            }
        })

    }
  }
module.exports = Employee  