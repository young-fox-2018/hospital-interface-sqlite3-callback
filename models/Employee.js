const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./hospital.db")

class Employee {
    constructor(name, pass, position) {
      this.name = name
      this.position = position
      this.username = name
      this.password = pass
      this.logged = 0
    }

    static register(name, pass, position, cb) {
     let newEmployee = new Employee(name, pass, position);
     let insert =`
     INSERT INTO employees (username, password, position, isLoggedIn)
     VALUES ("${newEmployee.name}", "${newEmployee.password}", "${newEmployee.position}", "${newEmployee.logged}");`
     db.run(insert, function(err) {
         if (err) {
             cb({message: "err insert employee", err: err});
            }
         else {
             let last =`
             SELECT COUNT(*) AS total
             FROM employees`
             db.get(last, function(err, data) {
                 if (err) {
                     cb({message: "err last id", err: err})
                 } else {
                     cb(null, newEmployee, data)
                 }
             })
         }
     })
     db.close()
    }

    static login(username, pass, cb) {
        let data =`
        SELECT *
        FROM employees`
        db.all(data, function(err, rows) {
            if (err) {
                cb({message: "err read data"})
            } else {
                let cek = false;
                rows.forEach(row => {
                    if (row.isLoggedIn === 1) {
                        cek = true;
                    }
                });
                if (cek === true) {
                    cb("Tidak dapat melakukan login")
                } else {
                    cek = false;
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i].username === username && rows[i].password == pass) {
                            cek = true;
                            var id = i+1;
                            break;
                        }
                    }
                    if (cek === false) {
                        cb("username / password wrong")
                    } else {
                        let update =`
                        UPDATE employees
                        SET isLoggedIn = 1
                        WHERE id = ${id}`
                        db.run(update, function(err) {
                            if (err) {
                                cb({message: "err update", err: err})
                            } else {
                                cb(null,username)
                            }
                        })
                    }
                }
            }
        })
        db.close()
    }

    

}

module.exports = Employee