require('dotenv').config()
var mysql = require('mysql2');

var connection = mysql.createConnection({
	host        : process.env.MYSQLHOST,
	user 		: process.env.MYSQLUSER,
	password 	: process.env.MYSQLPASSWORD,
	port    	: process.env.MYSQLPORT,
});

connection.connect(function(err) {
    if (err) throw err;
    var query = "CREATE DATABASE webChat";
    connection.query(query, function(err, result){
        if(err) throw err;
        console.log('DB webChat created');
    });
});
