const db = require("../dataBase.js")

function setUp(params) {
  const qtEmployee = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    position VARCHAR,
    password VARCHAR , 
    login INTEGER DEFAULT 0
    )
  `

  const qtPatient = `
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    diagnosis VARCHAR)
  `

  db.serialize(function(){
    db.run(qtEmployee,function (err) {
      if(err) {
        console.log(err)
      } else {
        console.log(`Berhasil menambahkan tabel Employee.`)
      }
    })

    db.run(qtPatient,function (err) {
      if(err) {
        console.log(err)
      } else {
        console.log(`Berhasil menambahkan tabel Patient.`)
      }
    })
  })
  db.close()
}

setUp()
