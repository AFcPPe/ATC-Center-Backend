const mysql      = require('mysql');
exports.db = mysql.createPool({
    host     : '43.249.8.62',
    user     : 'ATCCenter',
    password : 'xyBKT5yKpcYwKLaC',
    database : 'atccenter'
});