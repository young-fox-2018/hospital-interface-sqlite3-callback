argv = process.argv.slice(2)

const Controller = require("./controllers/controller")

switch (argv[0]) {
    case "setupEmployees":
        Controller.setupEmployee()
        break;
    case "setupPatients":
        Controller.setupPatients()
        break;
    case "addEmployee":
        Controller.addEmployee(argv[1], argv[2], argv[3])
        break;
    case "updateEmployee":
        Controller.updateEmployee(argv[1], argv[2], argv[3])
        break;
    case "findById":
        Controller.findById(argv[1])
        break;
    case "findAll":
        Controller.findAll() 
        break;
    case "login":
        Controller.login(argv[1], argv[2])
        break;
    case "logout":
        Controller.logout()
        break;
    case "addPatient":
        Controller.addPatient(argv[1], argv.slice(2))
        break;
    default:
        break;
}