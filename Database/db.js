const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./Database/hospital.db')
// sudut pandang index


module.exports = db