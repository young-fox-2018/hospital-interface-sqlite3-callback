const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Setup {
    static init(callback) {
        db.serialize(function() {
            db.run(`DROP TABLE IF EXISTS employees`, function(err) {
                if (err) callback(err)
            })

            db.run(`DROP TABLE IF EXISTS patients`, function(err) {
                if (err) callback(err)
            })
            
            db.run(`CREATE TABLE IF NOT EXISTS employees (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    position TEXT NOT NULL,
                    isLogin INTEGER NOT NULL)`,
                function (err) {
                    if (err) callback(err)
                })
            
            db.run(`CREATE TABLE IF NOT EXISTS patients (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    diagnose TEXT NOT NULL)`,
                function (err) {
                    if (err) callback(err)
                })
            callback(null)
        })
    }
}

module.exports = {
    db,
    Setup
}