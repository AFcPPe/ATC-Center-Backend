const database = require('./database.js')
const util = require("util");
//
// database.db.connect()
// database.db.query("SELECT * FROM groups",function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

exports.getUser = async function (cid){
    return new Promise((result)=>{
        database.db.query("SELECT * FROM users where cid = "+cid,function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result(results)
            }
        })
    })
}
exports.getAllUser = async function (){
    return new Promise((result)=>{
        database.db.query("SELECT * FROM users",function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result(results)
            }

        })
    })
}
exports.setUserData = async function (cid,name,email,groups){
    return new Promise((result)=>{
        database.db.query(util.format("REPLACE INTO users(cid, name, email, groups) VALUES ('%s','%s','%s','%s')",cid,name,email,groups),function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result('ok')
            }
        })
    })
}
exports.getGroups = async function (){
    return new Promise((result)=>{
        database.db.query("SELECT * FROM groups",function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result(results)
            }

        })
    })
}