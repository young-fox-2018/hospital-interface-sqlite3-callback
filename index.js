const Controller  = require ('/home/aandroomeedaa/Desktop/hacktiv8/rePhase-1/WEEK-3/day-2/hospital-interface-sqlite3-callback/controllers/controller.js')
const argv        = process.argv.slice(2)


// Controller.test()
switch (argv[0]) {
  case 'setup'      :
    Controller.setup(argv[1])
  break
  case 'findall'      :
    Controller.findAll(argv[1])
  break
  case 'register'   :
    Controller.register(argv[1],argv[2],argv[3],argv[4])
  break
  case 'findone'      :
    Controller.findOne(argv[1],argv[2],argv[3])
  break
  case 'login'      :
    Controller.login(argv[1],argv[2])
  break
}
