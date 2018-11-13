const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../hospital.db")

db.serialize(()=> {
    db.run("DROP TABLE IF EXISTS employee")
    db.run("DROP TABLE IF EXISTS patients")
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255),
        role VARCHAR(255),
        isLogin INTEGER
    )`, (err) => {
        if (err) console.log(err)
    })
    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255),
        diagnosis TEXT
    )`, (err) => {
        if (err) console.log(err)
    })
    db.close()
})

module.exports = db