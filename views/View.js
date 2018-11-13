class View {
    static displayErr(err) {
        console.log('error has occured')
        console.log(err);
    }

    static displayMsg(data) {
        console.log(data)
    }
}

module.exports = View