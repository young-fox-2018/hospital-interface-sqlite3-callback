const db = require('./db')

class Employees {
    constructor (params) {
        this.id = params.id
        this.username = params.username
        this.password = params.password
        this.role = params.role
    }

    save (callback) {
        let query = `
            INSERT INTO employees 
            (username, password, role, isLogin)
            values
            ("${this.username}", "${this.password}", "${this.role}", 0)
            `
        Employees.findOne(this.username, function(err, data){
            if (err) {
                callback({
                    message: 'error get data register',
                    err: err
                })
            } else{
                if (data) {
                    callback({
                        message: `username ${data.username} telah digunakan`
                    })
                } else {
                    

                    db.run(query, function(err){
                        if (err) {
                            callback({
                                message: 'error insert data',
                                err: err
                            })
                        } else {
                            Employees.allData(function(err, data){
                                if (err) {
                                    callback({
                                        message: 'error read all data',
                                        err: err
                                    })
                                } else {
                                    callback(null, data)
                                }
                            })

                        }
                    })
                }
            }
        })

        

        db.close()
    }

    static allData(callback) {
        db.all('select * from employees', function(err, data){
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    static login(username, password, callback) {
        Employees.allData(function(err, data){
            if (err) {
                callback({
                    message: 'error get all data login',
                    err: err
                })
            } else {
                let userLogIn = false
                for (let i = 0; i < data.length; i++) {
                    if (data[i].isLogin) {
                        userLogIn = true
                    }
                }

                if (!userLogIn) {
                    Employees.findOne(username, function(err, data){
                        if (err) {
                            console.log(err)
                        } else {
                            // console.log(data)
                            if (data.username === username && data.password === password) {
                                db.run(`
                                update employees
                                set 
                                isLogin = 1
                                where username = '${data.username}'
                                `, function(err){
                                    if (err) {
                                        callback({
                                            message: 'error update login',
                                            err: err
                                        })
                                    } else {
                                        callback(null, username)
                                    }
                                })
                            } else {
                                callback('Username / Password wrong')
                            }
                        }
                    })
                } else {
                    callback({
                        message: 'there is other user has log in'
                    })
                }
            }
        })


        
    }

    static findOne(username, callback) {
        db.get(`
        select * from employees where username = '${username}'
        `, function(err, data){
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    // static setup(){
    //     db.serialize(function() {
    //         db.run('drop table if exists employees', function(err){
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 console.log('drop table employees')
    //             }
    //         })
        
    //         db.run(`
    //         CREATE TABLE employees (
    //             id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    //             username varchar,
    //             password varchar,
    //             role varchar,
    //             isLogin INTEGER
    //         );
    //         `, function(err){
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 console.log('table employees created')
    //             }
    //         })
    //     })
        
        
    //     db.close()
    // }

    static logOut(callback) {
        Employees.allData(function(err, data){
            if (err) {
                callback({
                    message: 'error get all data logout',
                    err: err
                })
            } else {
                // console.log(data)
                let userLogIn = false
                let user = {}

                for (let i = 0; i < data.length; i++) {
                    if (data[i].isLogin) {
                        userLogIn = true
                        user = data[i]
                    }
                }

                if (userLogIn) {
                    db.run(`
                    update employees 
                    set
                    isLogin = 0
                    where id = ${user.id}
                    `, function(err){
                        if (err) {
                            callback({
                                message: 'error update data logout'
                            })
                        } else {
                            callback(null, user)
                        }
                    })
                } else {
                    callback({
                        message: 'there is no user has login'
                    })
                }

            }
        })
    }

}

module.exports = Employees