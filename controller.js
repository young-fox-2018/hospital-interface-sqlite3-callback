const { Model } = require("./model")
const { View } = require("./view")
class Controller {
    static addEmployee(name,position,username,password){
        Model.addEmployee(name,position,username,password, function (err,data) { if(err) View.displayErr(err)
            else View.displayData(data)})}
    static addPatient(name,diagnosis){
        Model.addPatient(name,diagnosis, function (err, data) { if(err) View.displayErr(err)
            else View.displayData(data)})}
    static login(username,password){
        Model.login(username, password, function (err, data) { if(err) View.displayErr(err)
            else View.displayData(data)})}
    static logout(username){
        Model.logout(username, function (err, data) { if(err) View.displayErr(err)
            else View.displayData(data)})}
    static freshStart(){
        Model.freshStart( function (err, data) { if(err) View.displayErr(err)
            else View.displayData(data)})}
    static menu(){
        Model.menu( function (err, data) { if(err) View.displayErr(err)
        else View.displayData(data)})
    }
}
module.exports = { Controller:Controller }