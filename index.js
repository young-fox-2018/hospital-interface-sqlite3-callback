const argv = process.argv.slice(2)
const ControllerEmployee = require("./Controller/ControllerEmployee.js")
const View = require("./View/View.js")

switch (argv[0]) {
    case "register":
        // name, position, username, password
        ControllerEmployee.register(argv[1],argv[3],argv[1],argv[2])
        break;
    case "login":
        ControllerEmployee.login(argv[1],argv[2])
        break;
    case "addPatient":
        ControllerEmployee.AddPatient(argv[1],argv.slice(2))
        break;
    default:
        View.help()
        break;
}