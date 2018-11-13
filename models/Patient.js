const Model = require('../models/Model')

class Patient extends Model {
    constructor(name, diagnosa){
        super()
        this.name = name
        this.diagnosa = diagnosa
    }

    static addPatient(name, diagnosa, cb){
        let newData = new Patient(name, diagnosa)
        let keys = `${Object.keys(newData)}`
        let values = `"${name}", "${diagnosa}"`
        Patient.add("patients", keys, values, function (err) {
            if (err) cb(err)
            else {
                Patient.findAll("patients", function(err, rows){
                    if(err) cb(err)
                    else cb(null,rows)
                })
            }
        })
    }
}

module.exports = Patient