const argv = process.argv.slice(2)
const Controller = require('./Controllers/Controller')

const cmd = argv[0].split(":")
const input = argv.slice(1)
Controller.execute(cmd,input)