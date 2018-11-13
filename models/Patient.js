const db = require('../models/connectDb');

class Patient {
  constructor(ppl) {    
    this.name = ppl.name,
    this.doctor = ppl.doctor
    this.diagnosis = ppl.diagnosis
  }

  static execute(query, callback) {
    db.run(query, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
    // db.close();
}

  static addPatient(data, callback) {
    let newPatient = new Patient(data);

    const query = `INSERT INTO Patients 
                      (name, doctor, diagnosis)
                    VALUES ("${newPatient.name}", "${newPatient.doctor}", "${newPatient.diagnosis}")
                  `;
    Patient.execute(query, function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

  static getAllPatients(callback) {
    const query = `SELECT * FROM Patients`;
    db.all(query, function(err, rows) {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    })
    // db.close();
}
}

module.exports = Patient;