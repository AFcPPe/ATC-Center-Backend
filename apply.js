const database = require('./database.js')
const fs = require('fs')
const util = require("util")
const email = require("./sendMail")
exports.getUserApply = async function (cid){
    return new Promise((result)=>{
        database.db.query("SELECT * FROM apply where cid = "+cid,function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result(results)
            }
        })
    })
}

exports.createApply = async function (cid,name,mail,qq,job,ol_hour,eng,atc_exp,flight_exp,exp_hav,flight_time,submit_time){
    return new Promise((result)=>{
        submit_time = submit_time.replace('T',' ').replace('Z','')
        database.db.query(util.format("INSERT INTO apply(cid, name, mail, qq,job,ol_hour,eng,atc_exp,flight_exp,exp_hav,flight_time,submit_time) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')",cid,name,mail,qq,job,ol_hour,eng,atc_exp,flight_exp,exp_hav,flight_time,submit_time),function (error, results, fields) {
            if (error){
                result('bad')
                console.log(error)
            }else{

                const content = fs.readFileSync("./resources/ApplyNotifyAdmin.html",'utf-8')
                const mailbody = {
                    title:"SKYline管制员中心-收到了一封新的管制员申请",
                    body: util.format(content,name,mail,eng),
                    to:['1059946567@qq.com']//,'3314076990@qq.com']
                }
                email.send(mailbody)
                result(results)
            }
        })
    })
}

exports.getApply = async function (id){
    return new Promise((result)=>{
        database.db.query("SELECT * FROM apply where id = "+id,function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result(results)
            }
        })
    })
}

exports.delApply = async function (id){
    return new Promise((result)=>{
        database.db.query("DELETE FROM apply where id = "+id,function (error, results, fields) {
            if (error){
                result('bad')
            }else{
                result(results)
            }
        })
    })
}