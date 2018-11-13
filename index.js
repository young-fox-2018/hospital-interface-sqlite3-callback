const Controller = require('./controllers/Controller.js')

let argv = process.argv.slice(2)

switch (argv[0]) {
    case "register":
        console.clear()
        let name = argv[1]
        let username = argv[1]
        let password = argv[2]
        let role = argv[3]
        Controller.registerController(name, username, password, role)
        break;

    case "login":
        console.clear()
        let usernameLogin = argv[1]
        let passwordLogin = argv[2]
        Controller.loginController(usernameLogin, passwordLogin)
        break;

    case "addPatient":
        console.clear()
        let id = argv[1]
        let namaPasien = argv[2]
        let gejala = argv.slice(3)
        Controller.addPatientController(id, namaPasien, gejala)
        break;

    case "logout":
        console.clear()
        let uname = argv[1]
        Controller.logoutController(uname)

        break;
}




