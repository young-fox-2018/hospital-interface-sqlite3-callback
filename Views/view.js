class View {
    static displayError (err){
        console.log(`There is some error:
(${err})`)
    }

    static displaySuccess(msg){
        console.log(msg)
    }
}

module.exports = View