const Model = require("./model")
const db = require("./setupDB")

class Employees {
    constructor(username, password, position) {
      this.username = username
      this.password = password
      this.position = position
      this.loggedIn = 0
    }

    register (cb) {
      

        let sql = `INSERT INTO Employees
        (username, password, position, loggedIn )
        VALUES ("${this.username}", "${this.password}", "${this.position}","${this.loggedIn}")`
        
        console.log(sql)

        db.run(sql, (err) => {
        if(err){
          cb(err)
        }
        else{
          cb(null, `Successfully added employees ${this.username}`)
        }
        })
    }

    static login(params, cb){
      
      Employees.findOne({
        field :"loggedIn",
        value: "1"
      },
      function(err, baris){
        if(err){
          cb(err)
        }
        else{
          if(baris !== undefined){
            cb("There is other account already logged in")
          }
          else{
            Employees.findOne({
              field: "username",
              value: params.username
            }, function(err, row){
              if(err){
                cb(err)
              }
              else if(row.password !== params.password ){
                cb("Password is wrong")
              }
              else{
                Employees.updateData({
                  id: row.id,
                  field: "loggedIn",
                  value: 1
                }, function(err) {
                  if(err){
                    cb(err)
                  }
                  else{
                    cb(null, `${params.username} successfully logged in`)
                  }
                })
              }
            })


          }
        }
      })
    }

    
  static findOne(options, callback) {
    const getEmployee = `SELECT * FROM Employees WHERE ${options.field} = "${options.value}"`;

    db.get(getEmployee, function(err, row) {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    })
    // db.close();
  }

  static updateData(options, cb){
    console.log(options)
    let sql = `UPDATE Employees
    SET ${options.field} = "${options.value}"
    WHERE id = "${options.id}"`
      

    db.run(sql,function(err){
      if(err){
        cb(err)
      }
      else{
        cb(null)
      }
    })

    // db.close()

  }
}

module.exports = Employees