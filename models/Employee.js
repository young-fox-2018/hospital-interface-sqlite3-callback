const db = require('../models/connectDb');

class Employee {
    constructor(emp) {
        this.name = emp.name
        this.username = emp.username
        this.password = emp.password
        this.position = emp.position
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

    static addEmployee(data, callback) {
        const newEmployee = new Employee(data);

        Employee.findOne({field: 'username', value: newEmployee.username}, function(err, row) {
            if (err) {
                callback(err);
            } else {
                if (row) {                    
                    callback(`Username already used`);
                } else {
                    const addQuery = `INSERT INTO Employees 
                                        (name, username, password, position)
                                      VALUES
                                        ("${newEmployee.name}", "${newEmployee.username}", "${newEmployee.password}", "${newEmployee.position}")
                                    `;
                    Employee.execute(addQuery, function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, newEmployee);
                        }
                    });
                }
            }
        })
        
    }

    static login(options, callback) {
        Employee.findOne({field: 'isLoggedIn', value: 1}, function(err, row) {
            if (err) {
                callback(err);
            } else {
                if (row !== undefined) {
                    callback(`Log out first before log in again.`);
                } else {
                    Employee.findOne({field: 'username', value: options.username}, function(err, row) {
                        if (err) {
                            callback(err);
                        } else {
                            if (row === undefined) {
                                callback(`Cannot find username ${options.username} in database.`);
                            } else if (row.password !== options.password) {
                                callback(`Wrong username/password.`);
                            } else {
                                let data = {id: row.id ,field: 'isLoggedIn', value: 1};
                                Employee.updateData(data, function(err, data) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null, data);
                                    }
                                })
                            }
                        }
                    });
                }
            }
        })
    }

    static logout(callback) {
        Employee.findOne({field: 'isLoggedIn', value: 1}, function(err, row) {
            if (err) {
                callback(err);
            } else {
                Employee.updateData({id: row.id, field: 'isLoggedIn', value: 0}, function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                })
            }
        });
    }

    static updateData(data, callback) {
        const query = `UPDATE Employees SET ${data.field} = ${data.value} WHERE id = ${data.id}`;
        Employee.execute(query, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    static findOne(options, callback) {
        const getEmployee = `SELECT * FROM Employees WHERE ${options.field} = "${options.value}"`;

        db.get(getEmployee, function(err, row) {
            if (err) {
                callback(err);
            } else {
                callback(null, row);
            }
        })
        // db.close();
    }

    static getAllEmployees(callback) {
        const query = `SELECT * FROM Employees`;
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

module.exports = Employee;