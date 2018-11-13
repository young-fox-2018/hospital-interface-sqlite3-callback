const db = require('./db')


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT
    )`, (err) => {
            if (err) {
                throw err
            }
        })
    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        diagnosis TEXT NOT NULL
    )`, (err) => {
            if (err) {
                throw err
            }
        })
})

db.close()