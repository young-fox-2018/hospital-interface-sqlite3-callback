
const args = process.argv.slice(2);
const Controller = require("./Controller/controller");
const command = args[0]

// console.log(args)
switch(command) {
    case "register":
        Controller.register(args[1], args[2], args[3], args[4], args[5])
    break;
    case "login" :
        Controller.login(args[1], args[2])
    break;
    case "findOne" :
        Controller.findOne()
    break;
    case "login" : Controller.login(args[1], args[2])
    default: "Hospital Interface"
}

// name, position, username, password