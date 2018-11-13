const Model = require("./model")

class Employee extends Model {
    constructor(name, position, username, password) {
        super()
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.status = 0
    }

    static register(name, position, username, password, callback) {
        let newData = {}
        let role = true
        if (position === "admin") {
            newData = new Admin(name, position, username, password)
        }
        else if (position === "officeboy") {
            newData = new OfficeBoy(name, position, username, password)
        }
        else if (position === "receptionis") {
            newData = new Receptionis(name, position, username, password)
        }
        else if (position === "docter") {
            newData = new Docter(name, position, username, password)
        }
        else {
            role = false
            callback("Role not defind")
        }
        if (role === true) {
            Employee.findOne("Employees", "username", newData.username, (err, data) => {
                if (err) callback(err)
                else {
                    if (data === undefined) {
                        let data = `"${newData.name}","${newData.position}","${newData.username}","${newData.password}","${newData.status}"`
                        let column = `${Object.keys(newData)}`
                        Employee.save("Employees", column, data, (err) => {
                            if (err) callback(err)
                        })
                        callback(newData)
                    }
                    else {
                        callback("username sudah terdaftar")
                    }
                }
            })
        }

    }
    static login(username, password, callback) {
        Employee.findOne("Employees", "username", username, (err, data) => {
            if (err) callback(err)
            else {
                if (data.password === `${password}`) {
                    Employee.update("Employees", "status", "1", "id", `${data.id}`, (err) => {
                        if (err) callback(err)
                        else callback(null)
                    })

                }
                else {
                    callback("Password atau username salah")
                }

            }
        })
    }

    static logout(username, callback) {
        Employee.findOne("Employees", "username", username, (err, data) => {
            if (err) callback(err)
            else {
                if (data.status === 1) {

                    Employee.update("Employees", "status", "0", "id", `${data.id}`, (err) => {
                        if (err) callback(err)
                        else callback(null)
                    })
                }
                else {
                    callback("Anda belum login")
                }
            }
        })
    }
}



class Admin extends Employee {
    constructor(name, position, username, password) {
        super(name, "Admin", username, password)

    }
}

class OfficeBoy extends Employee {
    constructor(name, position, username, password) {
        super(name, "OfficeBoy", username, password)
    }

}
class Receptionis extends Employee {
    constructor(name, position, username, password) {
        super(name, "Receptionis", username, password)
    }

}
class Docter extends Employee {
    constructor(name, position, username, password) {
        super(name, "Docter", username, password)
    }

}


module.exports = Employee