let argv = process.argv.slice(2)
const Controller = require('./controllers/controller')


switch (argv[0]) {
  case 'register': Controller.register(argv[1], argv[2] , argv[3]) ;break;
  case "login" : Controller.login(argv[1], argv[2]) ;break;
  case 'addPatient' : Controller.addPatient(argv[1], argv.slice(2)) ; break;
  case 'logout' : Controller.logout(argv[1]) ; break;
  default:
    break;
}