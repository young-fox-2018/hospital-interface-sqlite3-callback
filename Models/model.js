
const db = require("./setupDB")

class Model{
  static create(tableName, input, cb){
    // let newEmpl = new Employees(params.username, params.password, params.position)
    // console.log(newEmpl)
    let sql = `INSERT INTO ${tableName} (username, password, position, loggedIn ) VALUES ("${input.name}", "${input.password}", "${input.position}","${input.loggedIn}")`
    console.log(sql)
    db.run(sql, function(err){
      if(err){
        cb(err)
      }
      else{
        cb(null)
      }
    })
  }
}


module.exports = Model