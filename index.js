const argv = process.argv.slice(2);
const Controller = require("./Controllers/controller")

switch (argv[0]) {
    case "register":
        Controller.register(argv[1], argv[2], argv[3]) //username, password, position
        break;

    case "login":
        Controller.login(argv[1], argv[2]) //username, password
        break;

    case "find":
        Controller.find(argv[1], argv[2]) //field, value
        break; 

    case "addPatient":
        Controller.addPatient(argv[1], argv.slice(2).join(" "))
        break;

    case "logout":
        Controller.logout()
        break;

    default:
        break;
}
