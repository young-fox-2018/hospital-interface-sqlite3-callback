let db = require('./db')

class Diseases {
    static allData (callback) {
        db.all(`
        select * from diseases
        ` ,function(err, data) {
            if (err) {
                callback({
                    message: 'error get all data diseases'
                })
            } else {
                callback(null, data)
            }
        }) 
    }
}

module.exports = Diseases