const ControllerEmployees = require('./controllers/ControllerEmployees')
const ControllerPatients = require('./controllers/ControllerPatients')
const argv = process.argv.slice(2)

switch (argv[0]) {
    case 'register':
        ControllerEmployees.register(argv[1], argv[2], argv[3])
        break;
    case 'login':
        ControllerEmployees.login(argv[1], argv[2]) 
        break
    // case 'setup':
    //     ControllerEmployees.setup()
    //     break
    case 'logout':
        ControllerEmployees.logout()
        break
    case 'addPatient':
        ControllerPatients.addPatient(argv[1], argv.slice(2))
        break
    default:
        console.log('error syntax')
        break;
}
