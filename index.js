const argv = process.argv.slice(2)
const EmployeeController = require('./controllers/EmployeeController')
const PatientController = require('./controllers/PatientController')

switch (argv[0]) {

    case "register":
        EmployeeController.register(argv[1], argv[2], argv[3])
        break;

    case "login":
        EmployeeController.login(argv[1], argv[2])
        break;

    case "logout":
        EmployeeController.logout()
        break;

    case "addPatient":
        PatientController.add(argv[1], argv.slice(2))
        break;

    default:
        EmployeeController.help()
        break;
}