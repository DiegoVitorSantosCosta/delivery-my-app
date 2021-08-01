const mysql2 = require('mysql2');

var pool = mysql2.createPool({
    "user":"root",
    "password": "diegovitor",
    "database": "banco_api",
    "host": "172.17.0.2",
    "port": 3306
})

exports.pool = pool