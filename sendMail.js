var email = {
    config: {
        host: 'smtp.skylineflyleague.cn',
        port: 25,
        account: 'noreply@skylineflyleague.cn',
        pwd: '1qaz2wsx3edc'
    },
    async send(obj) {
        //connect
        var res = await this.connect()
        if (res.code) return res
        var serv = res.msg
        //AUTH LOGIN
        res = await this.login(serv)
        if (res.code) return res
        //send mail
        res = await this.sendMail(serv, obj)
        if (res.code) return res
        //quit
        return await this.quit(serv)
    },
    async sendMail(socket, obj) {
        if (typeof obj.to != 'object' || !obj.title || !obj.body) return { code: 3, msg: 'email para error' }
        //MAIL FROM
        var from = this.config.account
        var res = await this.say(`MAIL FROM:<${from}>\r\n`, socket)
        if (res.code) return res
        //RCPT TO
        for (var i in obj.to) {
            res = await this.say(`RCPT TO:<${obj.to[i]}>\r\n`, socket)
            if (res.code) return res
        }
        //DATA
        res = await this.say(`DATA\r\n`, socket)
        if (res.code) return res
        //DATA start
        var data = `MIME-Version:1.0\r\n` +
            `Content-Type:text/html;charset=utf-8\r\n` +
            `Cc:${obj.to.join()}\r\n`+  //抄送人
            `From:${from}\r\n` +
            `Subject:${obj.title}\r\n` +
            `\r\n${obj.body}\r\n` +
            `\r\n.\r\n`;
        return await this.say(data, socket)
    },
    async connect() {
        if(!this.config.host||!this.config.port)return {code:1,msg:'config error'}
        const net = require('net')
        var serv = net.connect({
            host: this.config.host,
            port: this.config.port
        })
        serv.on('error',err=>{
            serv.end();
            console.log(err)
        })
        var res = await this.getData(serv)
        if (res.code) return { code: 1, msg: 'connect error' }
        res=await this.say(`HELO 127.0.0.1\r\n`, serv)
        return res.code?res:{code:0,msg:serv}
    },
    async login(socket) {
        if(!this.config.account||!this.config.pwd)return {code:1,msg:'config error'}
        var account = Buffer.from(this.config.account).toString('base64')
        var pwd = Buffer.from(this.config.pwd).toString('base64')

        var res = await this.say(`AUTH LOGIN\r\n`, socket)
        if (res.code) return res

        res = await this.say(`${account}\r\n`, socket)
        if (res.code) return res

        return await this.say(`${pwd}\r\n`, socket)
    },
    async quit(socket) {
        var res = await this.say(`QUIT\r\n`, socket)
        if (!res.code) socket.end()
        return res
    },
    say(cmd, socket) {
        var that=this
        return new Promise(resolve=> {
            socket.write(cmd)
            socket.on('data', data => {
                socket.removeAllListeners('data');
                data = data.toString()
                if(/^[4|5]/.test(data))socket.end()
                resolve({
                    code: /^[4|5]/.test(data) ? 1 : 0,
                    msg: `${cmd}${data}`
                })
            })
        })
    },
    getData(socket) {
        return new Promise(resolve => {
            socket.on('data', data => {
                socket.removeAllListeners('data');
                data = data.toString()
                resolve({
                    code: /^[4|5]/.test(data) ? 1 : 0,
                    msg: `${data}`
                })
            })
        })
    }
}
module.exports = email