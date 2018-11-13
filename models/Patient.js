const Query = require('./Query')

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static setup(callback) {
      let name = `patients`
      let attributes = `id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, diagnose TEXT`
      Query.createTable(name,attributes,function(err) {
        if (err) callback(err)
        else callback()
      })
    }
  }

  module.exports = Patient
  