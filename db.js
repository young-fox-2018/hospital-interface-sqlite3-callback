const query = require('sqlite3').verbose()
const db = new query.Database('./hospital.db')

module.exports = db