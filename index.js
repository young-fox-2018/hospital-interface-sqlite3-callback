const argv = process.argv
const { Controller } = require("./controller")

switch (argv[2]) {
    case "registerEmployee":
        Controller.addEmployee(argv[3], argv[4], argv[5], argv[6])
        break;
    case "registerPatient":
        Controller.addPatient(argv[3], argv.slice(4))
        break;
    case "login":
        Controller.login(argv[3],argv[4])
        break;
    case "logout":
        Controller.logout(argv[3])
        break;
    case "firstSetup":
        Controller.freshStart()
        break;

    default:
        Controller.menu()
        break;
}

