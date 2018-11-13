
const Employee = require("../Models/employee");
const View = require("../Views/view")

class Hospital {
    static register(name, position, username, password) {
        Employee.register(name, position, username, password, function(err, data, total) {
          if(err) {
              View.displayRegister(err)
          } else {
              View.displayRegister(JSON.stringify(data), total)
          }
        })
    }

    static findOne() {
        Employee.findOne(function(err, data) {
            if(err) {
                View.displayOne(err)
            } else {
                View.displayOne(data)
            }
        })
    }
    static login(username, password) {
        Employee.login(username, password, function(err, data) {
            if(err) {
                View.displayLogin(err)
            } else {
                View.displayLogin(data)
            }
        })
    }
}

module.exports = Hospital;