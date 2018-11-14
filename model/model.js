const db = require('./dbsetup.js')

class Model {
  static register(input, callback) {
    let addData = 
    `
      INSERT INTO Employees (name, role, username, password, isLogin)
      VALUES ("${input.name}", "${input.role}", "${input.username}", "${input.password}", ${input.isLogin})
    `
    db.run(addData, function(err){
      if(err) {
        callback(err)
      } else {
        callback(null)
      }
    })
    db.close()
  }
  
  static addPatient(input, callback) {
    Model.findOne({field: 'isLogin', value: 1}, function(err, row) {
      if(err) {
        let obj = {
          message: 'error di cek dokter',
          details: err
        }
        callback(obj)
      } else {
        if(row === undefined) {
          callback(`Log in First`)
        }
        else if(row !== undefined && row.role !== 'dokter') {
          callback(`Only Doctor can Add Patient`)
        } else {
          Model.findOne({field: 'role', value: 'dokter'}, function(err, row) {
            if(err) {
              let obj = {
                message: 'error di cek log in',
                details: err
              }
              callback(obj)
            } else {
              if(row === undefined) {
                callback(`No Doctor is Logged in`)
              } else {
                let addData = 
                `
                INSERT INTO Patients (name, age, diagnose)
                VALUES ("${input.name}", "${input.age}", "${input.diagnose}")
                `
                db.run(addData, function(err) {
                  if(err) {
                    callback(err)
                  } else {
                    callback(null)
                  }
                })
              }
            }
          })
        }
      }
    })
  }
  static updateData(input, callback) {
    const queryUpdate = `UPDATE Employees SET ${input.field} = ${input.value} WHERE id = ${input.id}`
    db.run(queryUpdate, function(err) {
      if(err) {
        let obj = {
          message: 'error gagal update di method updateData',
          details: err
        }
        callback(obj)
      } else {
        callback(null)
      }
    })
  }

  static findOne(input, callback) {
    const findOneQuery = `
      SELECT * FROM Employees
      WHERE ${input.field} = "${input.value}"
    `
    db.get(findOneQuery, function(err,row) {
      if(err) {
        callback(err)
      } else {
        callback(null, row)
      }
    })
  }
}

module.exports = Model