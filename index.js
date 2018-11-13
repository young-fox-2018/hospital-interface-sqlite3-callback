const argv = process.argv.slice(2)
const command = argv[0]
const option = argv.slice(1)

const Controller = require('./controllers/controller')

switch (command) {
    case 'register':
        Controller.register(option)
        break;

    case 'login':
        Controller.login(option)
        break;

    case 'addPatient':
        Controller.addPatient(option)
        break;

    case 'logout':
        Controller.logout(option)
        break;

    default:
        break;
}