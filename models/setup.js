const db = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/models/db.js')

class Setup{

  static generateEmp(tableName){
    db.serialize(function() {
      db.run(`DROP TABLE IF EXISTS ${tableName}`, function (err) {
               if (err) {
                   cb(err)
               }
           })

      db.run(`CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        name TEXT,
        role TEXT,
        username TEXT ,
        password TEXT ,
        login INTEGER
      )`)

    });

    db.close();

  }

  static generatePatient(tableName){
    db.serialize(function() {
      db.run(`DROP TABLE IF EXISTS ${tableName}`, function (err) {
               if (err) {
                   cb(err)
               }
           })
    db.run(`CREATE TABLE IF NOT EXISTS patient (
      id INTEGER PRIMARY KEY AUTOINCREMENT ,
      name TEXT,
      gender TEXT ,
      age INTEGER,
      diagnosis TEXT
    )`)

        });

        db.close();

  }
}


module.exports = Setup
