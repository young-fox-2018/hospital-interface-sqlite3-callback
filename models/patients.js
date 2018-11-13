const Model = require("./model")

class Patient extends Model {
    constructor(name, diagnosis) {
        super()
        this.name = name
        this.diagnosisId = diagnosis
    }
    static addPatient(name, diagnosis, callback) {

        let newData = new Patient(name, diagnosis)
        Patient.findAll("Employees", "position", "Docter", (err, data) => {
            if (err) callback(err)
            else {
                let isDocter = false
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === 1) {
                        isDocter = true
                    }
                }

                if (isDocter === true) {
                    let data = `"${newData.name}","${newData.diagnosisId}"`
                    let column = `${Object.keys(newData)}`
                    Patient.save("Patients", column, data, (err) => {
                        if (err) callback(err)
                    })
                    callback(newData)
                }
                else callback("tidak memiliki akses untuk add Patient")
            }

        })

    }

}

module.exports = Patient