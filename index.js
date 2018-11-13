
const argv = process.argv
const EmployeeController = require('./controllers/EmployeeController')
const PatientController = require('./controllers/PatientController')

switch (argv[2]) {
    case 'createTable':
        EmployeeController.createTable(argv[3], argv[4])
        break;
    case 'findAll':
        EmployeeController.findAll()
        break;
    case 'register':
        EmployeeController.register(argv[3], argv[4], argv[5], argv[6], argv[7])
        break;
    case 'login':
        EmployeeController.login(argv[3], argv[4])
        break;
    case 'addPatient':
        PatientController.addPatient(argv[3], argv.slice(4).join(' '))
    case 'logout':
        EmployeeController.logout()
        break;
}