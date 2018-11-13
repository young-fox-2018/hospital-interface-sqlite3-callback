class View {
    static displayError(err) {
        console.log(`ERROR:`)
        console.log(err)
    }

    static displayData(data) {
        console.log(`DATA:`)
        data.forEach(element => {
            console.log(element)
        });
    }

    static setup() {
        console.log(`Table init success!`)
    }

    static register(data) {
        console.log(`Register success {username: ${data[data.length - 1].username}, password: ${data[data.length - 1].password}, position: ${data[data.length - 1].position}}. Total emoloyee: ${data.length}`)
    }

    static login(data) {
        data.forEach(element => {
            console.log(`User ${element.username} logged in succesfully`)
        })
    }

    static logout() {
        console.log(`Logged out!`)
    }

    static updateMyData(data) {
        data.forEach(element => {
            console.log(`Update success {username: ${element.username}, password: ${element.password}, position: ${element.position}}`)
        })
    }

    static deleteMyAccount(id) {
        console.log(`Your account successfully deleted!`)
    }

    static addPatient(data) {
        console.log (`New Patient added {name: ${data[data.length - 1].name}, diagnose: ${data[data.length - 1].diagnose}. Total patients: ${data.length}}`)
    }
}

module.exports = View