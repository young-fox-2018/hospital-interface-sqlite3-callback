const db = require("./Models/setupDB");
const View = require("./Views/view")


let queryEmplTable = `
    CREATE TABLE IF NOT EXISTS Employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    password VARCHAR,
    position VARCHAR,
    loggedIn BIT
    )`

let queryPatTable = `
    CREATE TABLE IF NOT EXISTS Patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        diagnosis VARCHAR
    )`

db.serialize(function () {
    // db.run(`DROP TABLE IF EXISTS Employees`)

    db.run(queryEmplTable, function(err){
        if(err){
            View.displayError(err)
        }
        else{
            View.displaySuccess("Successfully added Employees table")
        }
    })

    db.run(queryPatTable, function(err){
        if(err){
            View.displayError(err)
        }
        else{
            View.displaySuccess("Successfully added Patients table")
        }
    })

    db.close()

})
