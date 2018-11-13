const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

db.serialize(function() {

    db.run(`DROP TABLE IF EXISTS employees`, function(err) {
        if(err) console.log(err)
    })

    db.run(
        `CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT NOT NULL, 
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            logged INTEGER NOT NULL DEFAULT 0
        )`,
        function(err) {
            if (err) console.log(err)
        }
    )

    db.run(`DROP TABLE IF EXISTS patients`, function(err) {
        if(err) console.log(err)
    })

    db.run(
        `CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            diagnosa TEXT NOT NULL
        )`,
        function(err) {
            if (err) console.log(err)
        }
    )

    console.log("Database created successfully")
})

db.close()
