"use strict"
const argv = process.argv.slice(2)
const Controller = require('./controllers/controller.js')

switch (argv[0]) {
    case 'createEmployeeTable':
        Controller.createEmployeesTable()
        break;
    default:
    case 'register':
        Controller.registerEmployee(argv[1], argv[2], argv[3], argv[4])
        break;
    case 'login':
        Controller.login(argv[1], argv[2])
        break;
    case 'addPatient':
        let diagnosis = ""

        for (let i = 2; i < argv.length; i++) {
            diagnosis += argv[i] + ' '
        }
       
        diagnosis = diagnosis.substring(0, diagnosis.length - 1)
        Controller.addPatient(argv[1], diagnosis)
}