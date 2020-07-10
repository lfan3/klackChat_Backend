require('dotenv').config()

var mysql = require('mysql2');
var util = require('util')

var pool = mysql.createPool({
            connectionLimit : 15,
            host        : process.env.MYSQLHOST,
            user        : process.env.MYSQLUSER,
            password 	: process.env.MYSQLPASSWORD,
            database    : process.env.MYSQLDB,
            port    	: process.env.MYSQLPORT,
})

pool.query = util.promisify(pool.query)


module.exports.pool = pool
