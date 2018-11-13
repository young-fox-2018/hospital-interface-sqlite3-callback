const db = require("../database/connection")
class Model {
    static save(table, columns, data, callback) {
        db.run(
            `INSERT INTO ${table} (${columns})VALUES (${data})`,
            (err) => {
                if (err) callback(err)
            }
        )
    }

    static update(table, column, updateData, param, data, callback) {
        db.run(`UPDATE  ${table} SET ${column} = "${updateData}" WHERE ${param} = ${data}`, (err) => {
            if (err) callback(err)
            else callback(null)
        });
    }
    static findOne(table, columns, param, callback) {




        db.get(
            `SELECT * FROM ${table} WHERE ${columns}="${param}" `,
            (err, data) => {
                if (err) callback(err, null)
                else callback(null, data)
            }
        )
    }
    static findAll(table, columns, param, callback) {
        db.all(
            `SELECT * FROM ${table} WHERE ${columns}="${param}" `,
            (err, data) => {
                if (err) callback(err, null)
                else callback(null, data)
            }
        )
    }
}

module.exports = Model