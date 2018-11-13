class View {
    static printLine(input) {
        console.log(input)
    }
    static printError(err) {
        console.log(`ERROR: ${err}`)
    }
    static printEmployee(object) {
        console.log(`Successfully adding new employee:`)
        console.log(`Username: ${object.username}`)
        console.log(`Password: ${object.password}`)
        console.log(`Role: ${object.position}`)
    }
    static printUpdateEmployee(id, object) {
        console.log(`Successfully updated data ${id}`)
        console.log(`Username: ${object.username}`)
        console.log(`Password: ${object.password}`)
        console.log(`Role: ${object.position}`)
        console.log(`isLogin: ${object.isLogin}`)
    }
    static printLoginUser(object) {
        console.log(`User ${object.name} has successfully logged in`)
    }
    static printAddPatient(object){
        console.log(`Successfully add patient ${object.name}`)
    }
}

module.exports = View