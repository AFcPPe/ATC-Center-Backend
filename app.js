const express = require('express');
const AES = require('./AES')
const app = express()
const users = require('./users')
const response = require('./response')
const {getUserApply, createApply, getApply,delApply} = require("./apply");
const utils = require('./utils')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    console.log(req.url)
    next()
    // if (req.headers.referer && req.headers.referer.indexOf('https://atc.skylineflyleague.cn/') !== -1) {
    //     next();
    // } else {
    //     res.status(403).send('Access Denied');
    // }
    // if (req.headers.referer && req.headers.referer.indexOf('http://localhost:6677/') !== -1) {
    //     next();
    // } else {
    //     res.status(403).send('Access Denied');
    // }
});


//获取单个用户数据 参数cid
app.post('/getUser',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }

    if (data['cid']!==undefined){
        users.getUser(data['cid']).then(r => {
            if(r == 'bad'){
                res.end(response.getResponse(404,'bad',r))
            }else if(JSON.stringify(r) == '[]'){
                res.end(response.getResponse(404,'Cannot find User',r))
            }else{
                res.end(response.getResponse(200,'ok',r))
            }
        })
    }else{
        res.end(response.getResponse(404,'Invalid Input','[]'))
    }
})
//获取所有用户数据 参数默认
app.post('/getAllUser',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }
    users.getAllUser().then(r => {
        if(r == 'bad'){
            res.end(response.getResponse(404,'bad',r))
        }else if(JSON.stringify(r) == '[]'){
            res.end(response.getResponse(404,'Cannot find User',r))
        }else{
            res.end(response.getResponse(200,'ok',r))
        }
    })
})
//修改用户数据 参数cid,email,name,group
app.post('/setUserData',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }
    if (data['cid']!==undefined&&data['email']!==undefined&&data['name']!==undefined&&data['group']!==undefined){
        users.setUserData(data['cid'], data['name'], data['email'], data['group']).then(r =>{
            if(r == 'bad'){
                res.end(response.getResponse(404,'bad',r))
            }else{
                res.end(response.getResponse(200,'ok',r))
            }
        })
    }else{
        res.end(response.getResponse(404,'Invalid Input','[]'))
    }
})
//获取用户组列表 参数默认
app.post('/getGroups',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }
    users.getGroups().then(r => {
        if(r == 'bad'){
            res.end(response.getResponse(404,'bad',r))
        }else if(JSON.stringify(r) == '[]'){
            res.end(response.getResponse(404,'Cannot get groups',r))
        }else{
            res.end(response.getResponse(200,'ok',r))
        }
    })
})
//获取单个用户申请数据 参数cid
app.post('/getUserApply',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }

    if (data['cid']!==undefined){
        getUserApply(data['cid']).then(r => {
            if(r == 'bad'){
                res.end(response.getResponse(404,'bad',r))
            }else if(JSON.stringify(r) == '[]'){
                res.end(response.getResponse(404,'Cannot find any apply of the user',r))
            }else{
                res.end(response.getResponse(200,'ok',r))
            }
        })
    }else{
        res.end(response.getResponse(404,'Invalid Input','[]'))
    }
})
//新建管制员申请 参数cid,name,mail,qq,job,ol_hour,eng,atc_exp,flight_exp,exp_hav
app.post('/createApply',function (req, res){
    let data= {}
    try{
        console.log(JSON.parse(AES.decrypt(req.body.data)))
        data = JSON.parse(AES.decrypt(req.body.data))

    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }
    const keysToCheck = ['cid', 'name', 'mail', 'qq', 'job', 'ol_hour', 'eng', 'atc_exp', 'flight_exp', 'exp_hav','flight_time']
    if (utils.hasAllKeys(data,keysToCheck)){
        createApply(data['cid'],data['name'],data['mail'],data['qq'],data['job'],data['ol_hour'],data['eng'],data['atc_exp'],data['flight_exp'],data['exp_hav'],data['flight_time'],data['submit_time']).then(r =>{
            if(r == 'bad'){
                res.end(response.getResponse(404,'bad',r))
            }else{
                res.end(response.getResponse(200,'ok',r))
            }
        })
    }else{
        res.end(response.getResponse(404,'Invalid Input','[]'))
    }
})
//获取某个申请 参数id
app.post('/getApply',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }
    if (data['id']!==undefined){
        getApply(data['id']).then(r => {
            if(r == 'bad'){
                res.end(response.getResponse(404,'bad',r))
            }else if(JSON.stringify(r) == '[]'){
                res.end(response.getResponse(404,'Cannot find any apply of the id',r))
            }else{
                res.end(response.getResponse(200,'ok',r))
            }
        })
    }else{
        res.end(response.getResponse(404,'Invalid Input','[]'))
    }
})
//删除某个申请 参数id
app.post('/delApply',function (req, res){
    let data= ''
    try{
        data = JSON.parse(AES.decrypt(req.body.data))
    }catch (e) {
        res.end(response.getResponse(404,'Invalid Input','[]'))
        return
    }
    if (data['id']!==undefined){
        delApply(data['id']).then(r => {
            if(r == 'bad'){
                res.end(response.getResponse(404,'bad',r))
            }else if(JSON.stringify(r) == '[]'){
                res.end(response.getResponse(404,'Cannot find any apply of the id',r))
            }else{
                res.end(response.getResponse(200,'ok',r))
            }
        })
    }else{
        res.end(response.getResponse(404,'Invalid Input','[]'))
    }
})
app.listen(6677);