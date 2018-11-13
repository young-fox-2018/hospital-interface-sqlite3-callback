const Controller = require('../Controllers/Controller')


class View {
    static showData(input) {
        // console.log(`This is your data....`)
        console.log(input)
    }
    static showError(err) {
        console.log(`Your error is...`)
        console.log(err)
    }
}

module.exports = View