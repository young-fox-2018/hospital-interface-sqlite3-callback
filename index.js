const inp = process.argv.slice(2)
const EmployeeController = require('./controllers/EmployeeController')

switch (inp[0]) {
    case 'employee':
        switch (inp[1]) {
            case 'register':
                EmployeeController.insert([inp[2],inp[3],inp[4]])
                break;
            case 'findAll':
                EmployeeController.findAll()
                break;
            case 'login':
                EmployeeController.login([inp[2],inp[3]])
                break;
            case 'logout':
                EmployeeController.logout()
                break;
            case 'addPatient':
                EmployeeController.addPatients(inp.slice(2))
            default:
                break;
                console.log('input salah')
                break;
        }
        break;

    default:
        break;
}