const input = process.argv.slice(2)
const EmployeeController = require('./controllers/EmployeeController')
const PatientController = require('./controllers/PatientController')

switch (input[0]) {
    case 'employee':
        if (input[1] === 'setup') EmployeeController.setup()
        else if (input[1] === 'register') EmployeeController.register(input[2],input[3],input[4])
        else if (input[1] === 'list') EmployeeController.showAll()
        else if (input[1] === 'search') EmployeeController.searchData(input[2],input[3])
        else if (input[1] === 'update') EmployeeController.updateData(input[2],input[3],input[4])
        break;
    case 'patient':
        if(input[1] === 'setup') PatientController.setup()
        else if (input[1] === 'register') PatientController.register(input[2],input[3],input[4])
        
        break;

    default:
        break;
}