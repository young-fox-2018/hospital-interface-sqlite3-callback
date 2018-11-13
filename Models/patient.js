
const db = require("../db.js")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static register() {
      
  }
}

module.exports = Patient