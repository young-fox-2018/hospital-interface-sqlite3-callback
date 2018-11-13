const ControllerEmployee = require('./controllers/ControllerEmployee')

const argv = process.argv.slice(2)
const command = argv[0]
const params = argv.slice(1)

// console.log(sakit_patient)

switch (command) {
    case 'register':
        ControllerEmployee.register(params)
        break;
    case 'login':
        ControllerEmployee.login(params)
        break;
    case 'logout' :
        ControllerEmployee.logout()
        break;
    case 'addPatient':
        ControllerEmployee.addPatient(params)
        break;
    default:
        ControllerEmployee.help()
        break;
}