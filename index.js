const argv = process.argv.slice(2)
const Controler = require("./controllers/Controller")

// console.log(argv);
switch (argv[0]) {
    case "register":
        Controler.register(argv[1], argv[2], argv[3]);
        break;
    case "login":
        Controler.login(argv[1], argv[2]);
    case "addPatient":
        Controler.addPatient(argv[1], argv.slice(2))
    default:
        break;
}