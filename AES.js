const CryptoJS = require('crypto-js');
const keys  = require('./secret')

exports.encrypt = function (word, keyStr){
    keyStr = keyStr ? keyStr : keys.keyLocal; //判断是否存在ksy，不存在就用定义好的key
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();

}
exports.decrypt = function (word, keyStr){
    keyStr = keyStr ? keyStr : keys.keyLocal;
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}