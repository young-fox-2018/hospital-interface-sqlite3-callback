const sqlite3  = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Model {

    // static dropTable(tableName, cb){
    //     db.run(`DROP TABLE IF EXISTS ${tableName}`, function(err) {
    //         if(err) cb(err)
    //         else cb(null)
    //     })
    // }

    // static createTable(tableName, dbQuery, cb){
    //     Model.dropTable(tableName, function(err){
    //         if(err) cb(err)
    //         else {
    //             db.run(dbQuery, function(err) {
    //                 if(err) cb(err)
    //                 else cb(null)
    //             })
    //         }
    //     })
    // }

    static findAll(tableName, cb) {
        db.all(`SELECT * FROM ${tableName}`, function(err, rows) {
            if(err) cb(err)
            else cb(null, rows)
        })
    }

    static findOne(tableName, field, value, cb) {
        db.get(`SELECT * FROM ${tableName} WHERE ${tableName}.${field} = '${value}'`, function(err, row) {
            if(err) cb(err)
            else cb(null, row)
        })
    }

    static add(tableName, keys, data, cb) {
        let query = `INSERT INTO ${tableName} 
            (${keys}) 
            VALUES (${data})
        `
        db.run(query, function(err) {
            if(err) cb(err)
            else cb(null)
        })
    }

    static update(tableName, field, value, whereId, cb) {
        let query = `UPDATE ${tableName}
            SET ${field} = '${value}'
            WHERE ${tableName}.id = '${whereId}'`
        db.run(query, function(err) {
            if(err) cb(err)
            else cb(null)
        })
    }

    static delete(tableName, whereField, whereValue, cb){
        let query = `DELETE FROM ${tableName}
            WHERE ${whereField} = ${whereValue}`
        db.run(query, function(err) {
            if (err) cb(err)
            else cb(null)
        })
    }

}

module.exports = Model