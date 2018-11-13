const db = require('./models/db')

db.serialize(function() {
    db.run('drop table if exists employees', function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table employees')
        }
    })

    db.run('drop table if exists patients', function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table patients')
        }
    })

    db.run('drop table if exists diseases', function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table diseases')
        }
    })

    db.run('drop table if exists patients_diseases', function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('drop table patients_diseases')
        }
    })

    db.run(`
    CREATE TABLE employees (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username varchar,
        password varchar,
        role varchar,
        isLogin INTEGER
    );
    `, function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('table employees created')
        }
    })


    db.run(`
    CREATE TABLE patients (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name varchar
    )
    `,function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('table patients created')
        }
    })

    db.run(`
        CREATE TABLE diseases (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            diseaseName varchar
        )
    `,function(err){
        if (err) {
            console.log(err)
        } else {
            console.log('table diseases created')
        }
    })

    db.run(`
    INSERT INTO diseases
    (diseaseName)
    values 
    ('batuk'),
    ('pilek'),
    ('flu'),
    ('demam'),
    ('patah hati'),
    ('luka dalam')
    `)

    db.run(`
    CREATE TABLE patients_diseases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientId INTEGER REFERENCES patients(id),
        deseaseId INTEGER REFERENCES desease(id)
    )
    `, function(err, data){
        if (err) {
            console.log(err)
        } else {
            console.log('table patients_diseases created')
        }
    })
})


db.close()