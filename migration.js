/** 
 * migration.js == api/controllers/initUserTable.js + config/pool.js
 * todo: delete initUsertable and pool, later
*/
require('dotenv').config()

var mysql = require('mysql2');
const migration = require('mysql-migrations')

var pool = mysql.createPool({
    connectionLimit : 15,
    host        : process.env.MYSQLHOST,
    user        : process.env.MYSQLUSER,
    password 	: process.env.MYSQLPASSWORD,
    database    : process.env.MYSQLDB,
    port    	: process.env.MYSQLPORT,
})

function executeQuery(sql, cb){
    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOLE_CONNECTION_LOST')
                console.error('Database connection was closed')
            if (err.code === 'ER_CON_COUNT_ERROR')
                console.error('Database has too many connections')
            if (err.code === 'ECONNREFUSED')
                console.error('Dababase Connection was refused')
        } else{
            if(connection){
                connection.query(sql, function (error,results, fields){
                    connection.release()
                    if(error){
                        return cb(error, null)
                    }
                    return cb(null, results)
                })
            }
        }
    })
}

function query(sql, cb){
    executeQuery(sql, function(err, data){
        if(err)
            return cb(err)
        cb(null, data)
    })
}

migration.init(pool, __dirname + '/database/migrations')

module.exports = {
    query,
    pool
}
