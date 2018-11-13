const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('/Users/zhang/phase1/p1w3/hospital-interface-sqlite3-callback/hospital.db')

module.exports = db