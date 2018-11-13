const db = require('../db.js')
const createtableEmployees = `CREATE TABLE IF NOT EXISTS Employees(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30),
    username VARCHAR(20),
    password VARCHAR(10),
    position VARCHAR(20),
    login INTEGER DEFAULT 0
)`
const createtablePatients = `CREATE TABLE IF NOT EXISTS patients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30),
    diagnosa VARCHAR
)`
db.serialize(function(){
    db.run(createtableEmployees,function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`table employee created`)
        }
    })
    db.run(createtablePatients,function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`table patients created`)
        }
    })
})
