const Controller = require('./controller/controller.js')

const argv = process.argv.slice(2)

let input = argv[0]

switch(input) {
    case 'register' : Controller.register(argv[1], argv[2], argv[3], argv[4], argv[5]); break;
    case 'addPatient' : Controller.addPatient(argv[1], argv[2], argv.slice(3).join(', ')); break;
    case 'login' : Controller.login(argv[1], argv[2]); break;
    case 'logout' : Controller.logout(argv[1]); break;
}