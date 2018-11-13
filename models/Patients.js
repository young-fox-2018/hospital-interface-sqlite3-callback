const db = require('./db')
const Employees = require('./Employees')
const Diseases = require('./Diseases')

class Patients {
    static addPatient(name, disease, callback)  {

        Employees.allData(function(err, data){
            if (err) {
                callback({
                    message: 'error get all data employe saat add patient',
                    err: err
                })
            } else {
                let userLogin = false
                let user = {}

                for (let i = 0; i < data.length; i++) {
                    if (data[i].isLogin) {
                        userLogin = true
                        user = data[i]
                    }
                }

                if (userLogin) {
                    if (user.role === 'dokter') {
                        Diseases.allData(function(err, data){
                            if (err) {
                                callback(err)
                            } else {
                                let diseaseNotFound = false

                                let diseaseList = data.map((dataDisease) => {
                                    return dataDisease.diseaseName
                                })

                                let diseaseListIndex = data.filter((dataDisease) => {
                                    if (disease.indexOf(dataDisease.diseaseName) !== -1) {
                                        return dataDisease
                                    }
                                })


                                for (let i = 0; i < disease.length; i++) {
                                    if (diseaseList.indexOf(disease[i]) === -1) {
                                        diseaseNotFound = true
                                    }
                                }

                                if (!diseaseNotFound) {
                                    // console.log(diseaseListIndex)

                                    db.run(`
                                    insert into patients
                                    (name)
                                    values
                                    ('${name}')
                                    `,function(err){
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            


                                            let patientId = this.lastID
                                            let insertDisease = db.prepare(`
                                            INSERT INTO patients_diseases
                                            (patientId, deseaseId)
                                            values
                                            ((?), (?))
                                            `)
                                            for (let i = 0; i < diseaseListIndex.length; i++) {
                                                insertDisease.run(patientId, diseaseListIndex[i].id)
                                            }

                                            insertDisease.finalize(function(err){
                                                if (err){
                                                    callback({
                                                        message: 'error insert disease id in conjunction table',
                                                        err: err
                                                    })
                                                } else {
                                                    Patients.allData(function(err, data){
                                                        if (err) {
                                                            callback(err)
                                                        } else {
                                                            callback(null, data)
                                                        }
                                                    })

                                                }
                                            })
                                        }
                                    })
                                } else {
                                    callback({
                                        message: 'not found disease'
                                    })
                                }
                            }
                        })
                    } else {
                        callback({
                            message: `you don't have permission for add patient`
                        })
                    }
                } else {
                    callback({
                        message: 'Please login before add patient'
                    })
                }
            }
        })
    }


    static allData (callback) {
        db.all(`
        select * from patients
        `,
        function(err, data){
            if (err) {
                callback({
                    message: 'error get all data',
                    err: err
                })
            } else {
                callback(null, data)
            }
        })
    }
}

module.exports = Patients