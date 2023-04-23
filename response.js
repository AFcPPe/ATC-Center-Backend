const AES = require('./AES')


exports.getResponse = function (code,msg,data){
    const js = {
        code:code,
        msg:msg,
        data:data
    }
    const str = JSON.stringify(js)
    return str
}