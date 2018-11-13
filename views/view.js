
class View {

    static errorAlert(input) {
        console.log(`Sorry, Error:`)
        console.log(input)
    }

    static showMessage(input) {
        console.log(input)
    }

    static fetchData(input) {
        let field = Object.keys(input)
        let Value = Object.values(input)
        field.forEach(function (datum,index) {
            console.log(`${datum} = ${Value[index]}`)
        })
    }

    static fetchArrayData(input) {
        input.forEach(function(data) {
            View.fetchData(data)
            console.log(`===============`)
        })
    }

}

module.exports = View