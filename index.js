const argv = process.argv.slice(2)
const Controller = require('./Controllers/controller')
const option = argv.slice(1)
// console.log(option)
switch (argv[0]) {
    case "register":
        Controller.register(option)
        break;
    case "login":
        Controller.login(option)
        break;
    case "addpatient":
        Controller.addpatient(option)
        break;
    case "logout":
        Controller.logout(option)
        break;
    default:
        break;
}