const Patient = require('../models/Patient');
const Employee = require('../models/Employee');
const View = require('../views/View');

class Controller {
    static register(data) {
        if (data.length < 4) {
            View.displayError(`Wrong command!\nregister <name> <username> <password> <position>`);
        } else {
            Employee.addEmployee({
                                    name: data[0],
                                    username: data[1],
                                    password: data[2],
                                    position: data[3]
                                }, function(err, newEmployee) {
                                   if (err) {
                                        View.displayError({msg: `Error create employee`,
                                                            err: err});
                                   } else {                
                                       Employee.getAllEmployees(function(err, rows) {
                                           if (err) {
                                               View.displayError({msg:`Error get employee data`,
                                                                    err: err});
                                           } else {
                                               View.displaySuccess(`Save data success ${JSON.stringify(newEmployee)}. Total employee: ${rows.length}`);
                                           }
                                       })                
                                   }
                                }
            );
        }
    }

    static login(data) {
        Employee.login({username: data[0], password: data[1]}, function(err, lastId) {
            if (err) {
                View.displayError(err);
            } else {
                View.displaySuccess(`Account ${data[0]} logged in.`);
            }
        });
    }

    static doctorAccess(data) {
        Employee.findOne({field: 'isLoggedIn', value: 1}, function(err, doctor) {
            if (err) {
                View.displayError(err);
            } else {
                if (doctor === undefined) {
                    View.displayError(`Please log in into your account...`);
                } else if (doctor.position !== 'dokter') {
                    View.displayError(`You don't have access to this menu!`);
                } else {
                    const patientName = data[0];
                    const diagnosis = data.slice(1).join(', ');
                    Patient.addPatient({name: patientName, doctor: doctor.id, diagnosis: diagnosis},
                        function(err) {
                            if (err) {
                                View.displayError(err);
                            } else {
                                Patient.getAllPatients(function(err, rows) {
                                    if (err) {
                                        View.displayError({msg: `Error getting patients data`, err: err});
                                    } else {
                                        View.displaySuccess(`Data patient saved! Total patients: ${rows.length}`);
                                    }
                                })
                            }
                        });                    
                }
            }
        })
    }

    static logout() {
        Employee.logout(function(err) {
            if (err) {
                View.displayError(err);
            } else {
                View.displaySuccess(`Logged out...`);
            }
        });
    }

}

module.exports = Controller;