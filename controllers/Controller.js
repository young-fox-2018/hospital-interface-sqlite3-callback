const Employee = require("../models/Employee")
const View = require("../views/View")
const Patient = require("../models/Patient")

class Controller {
    static register(username, pass, position) {
        Employee.register(username, pass, position, function(err, data, lastId) {
            if (err) {
                View.displayErr(err);
            } else {
                data = JSON.stringify(data);
                View.register(data, lastId)
            }
        })
    }

    static login(username, pass) {
        Employee.login(username, pass, function(err, data) {
            if (err) {
                View.displayErr(err);
            } else {
                View.displayLogin(data);
            }
        })
    }

    static addPatient(name, diagnosis) {
        Patient.add(name, diagnosis, function(err, data) {
            if (err) {
                View.displayErr(err);
            } else {
                data = data.total
                View.addPatient(data);
            }
        })
        
    }

}

module.exports = Controller