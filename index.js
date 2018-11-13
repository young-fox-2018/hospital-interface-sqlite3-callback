const argv = process.argv.slice(2)
const Controller = require('./controllers/controller')

switch (argv[0]) {
    case 'setup':
        Controller.setup()
        break

    case 'findAllEmployees':
        Controller.findAllEmployees()
        break

    case 'findOneEmployee':
        Controller.findOneEmployee(argv[1]) // Employee ID
        break

    case 'register':
        Controller.register(argv[1], argv[2], argv[3])
        break

    case 'login':
        Controller.login(argv[1], argv[2])
        break

    case 'logout':
        Controller.logout() // login first
        break

    case 'updateMyData':
        Controller.updateMyData(argv[1], argv[2]) // login first
        break
    
    case 'deleteMyAccount':
        Controller.deleteMyAccount() // login first
        break

    case 'addPatient':
        Controller.addPatient(argv[1], argv[2])
        break
}