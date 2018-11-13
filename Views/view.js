
class View {
    static displayRegister(data, input) {
        console.log(`save data success ${data}, Total employees: ${input.total}`)
    }
    static displayLogin(input) {
        console.log(`user ${input.name} sukses masuk`)
    }

    static displayOne(input) {
        console.log(input)
    }
}

module.exports = View