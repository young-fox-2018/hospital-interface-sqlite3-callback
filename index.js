const Controller = require('./controllers/Controller');
const args = process.argv.slice(2);

const command = args[0];
const data = args.slice(1);

switch (command) {
    case 'register': Controller.register(data); break;
    case 'login': Controller.login(data); break;
    case 'logout': Controller.logout(); break;
    case 'addPatient': Controller.doctorAccess(data); break;
    default:
        break;
}