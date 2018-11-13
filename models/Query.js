const db = require('./Connection')

class Query {

    static createTable(name,attributes,callback) {
        db.serialize(function(err) {
            if (err) callback(err)
            else {
                db.run(`DROP TABLE IF EXISTS ${name};`,function(err) {
                    if (err) callback(err)
                })
                db.run(`CREATE TABLE ${name} (${attributes});`,function(err) {
                    if(err) callback(err)
                    else callback()
                })
            }
        })
    }

    static addRecord(tabName,record,callback) {
        let field = Object.keys(record).join(',')
        let values = Object.values(record)
        values.forEach((datum,index) => { 
                values[index] = `"${datum}"`
            })
        values = values.join(',')
        // console.log(values)
        db.serialize(function(err) {
            if (err) callback(err)
            else {
                db.run(`INSERT INTO ${tabName} (${field}) VALUES (${values});`,function(err) {
                    if (err) callback(err,null)
                    else callback(null,this)
                })
            }
        }) 
    }

    static findAll(tabName,callback) {
        db.all
        (`SELECT * FROM ${tabName};`,function(err,rows) {
            if (err) callback(err,null)
            else callback(null,rows)
        })
    }

    static findOne(tabName,field,value,callback) {
        db.get
        (`SELECT * FROM ${tabName} 
        WHERE ${field} = "${value}";`,function(err,rows) {
            if (err) callback(err,null)
            else callback(null,rows)
        })
    }

    static update(tabName,option,callback) {
        db.run
        (`UPDATE ${tabName}
        SET ${option.field} = "${option.value}"
        WHERE id = ${option.id};`,function(err) {
            if (err) callback(err,null)
            else callback(null,this)
        })
    }

}

module.exports = Query