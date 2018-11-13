const db = require('./setupDb')

db.serialize(function(){
    const employees = `CREATE TABLE IF NOT EXISTS Employees 
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(100),
                        position VARCHAR(50),
                        username VARCHAR(100) UNIQUE,
                        password VARCHAR,
                        loggedIn INTEGER
                    );`
    
    db.run(employees,function(err){
        if (err){
            console.log("ERR create: ", err)
        }
        else{
            console.log("Employees Table has been created")
        }
    })
    

    const patients = `CREATE TABLE IF NOT EXISTS Patients
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(100),
                        diagnosis TEXT
                    );`
    db.run(patients,function(err){
        if(err){
            console.log("ERR create Patients Table: ", err)
        }
        else{
            console.log("Patients Table has been created")
        }
    })  
})

db.close()