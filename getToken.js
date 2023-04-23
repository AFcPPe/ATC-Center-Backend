const AES = require('./AES')

// let data = {
//     username:'6184',
//     password:'Xur13622',
//     randomNum:1456156
// }

let data = {
    id:11,
    randomNum:1456156
}

const strData = JSON.stringify(data)
const enc = AES.encrypt(strData)
const dec = AES.decrypt('JLF6ISw/XjLsUE+/U2mssZplWTujtKJq+uTl7uOaBoLsA9ptajtrXcs/dSUZuN6VCPKZPyh6Hat9fK8mQSSrOI5hfFnI+STxwQ61zeoSLNDsoiaKFruxHO/2c5jx97C0EPBwwzj++Lvkmw1xDUozENF3wOplxrAa0l5UdtRn8Y952BE2z7Y2bdgAAqHd8vgtYSOF8HPvjocK79FNE2JR35Ky6U7Jzgj5Vg0Pu' +
    'prZgMimngz4Oz8hqxaUzOE0DhWE62oiPzl0OTHN9hf901jdlA==')
console.log(enc)
