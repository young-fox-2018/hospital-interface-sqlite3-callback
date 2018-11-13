const Model = require('./Model')

class Employee extends Model{
    constructor(username, password, role) {
        super()
        this.username = username
        this.password = password
        this.role = role
    }

    // static createTable(cb) {
    //     let query = `CREATE TABLE IF NOT EXISTS employees (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         username TEXT NOT NULL,
    //         password TEXT NOT NULL,
    //         role TEXT NOT NULL
    //         )`
    //     Model.createTable('employees', query, function(err) {
    //         if (err) cb(err)
    //         else cb(null)
    //     })
    // }

    // static drop(cb){
    //     Model.dropTable('employees', function(err) {
    //         if(err) cb(err)
    //         else cb(null)
    //     })
    // }

    static register(username, password, role, cb) {
        Employee.findOne("employees", "username", username, function(err, rows) {
            if (err) cb(err)
            else{
                if(!rows){
                    let newData = new Employee(username, password, role)
        
                    let keys = `${Object.keys(newData)}`
                    let values = `"${username}", "${password}", "${role}"`
                    
                    Employee.add("employees", keys, values, function(err) {
                        if(err) cb(err)
                        else{
                            Employee.findAll("employees", function (err, data) {
                                if (err) cb(err)
                                else cb(null, data)
                            })
                        }
                    }) 
                } else {
                    cb("This username already exist. Please change your username")
                }
            }
        })
    }
}

module.exports = Employee;