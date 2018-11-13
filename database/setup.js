const db = require('./db')

class Setup {
    static createTable(tableName, field, cb) {
        db.serialize(function () {
            db.run(`DROP TABLE IF EXISTS ${tableName}`, function (err) {
                if (err) {
                    cb(err)
                }
            })
            db.run(`CREATE TABLE ${tableName} (
                    ${field}
                    )`, function (err) {
                    if (err) {
                        cb(err)
                    } else {
                        cb(null)
                    }
                })
        })

    }
}




module.exports = Setup