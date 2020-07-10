const {pool}  = require('./pool')

const User = "CREATE TABLE IF NOT EXISTS user(\
                id INT NOT NULL AUTO_INCREMENT,\
                pseudo VARCHAR(50) NOT NULL,\
                password VARCHAR(255) NOT NULL,\
                PRIMARY KEY(id)\
            );"

let tables = [
    User
]

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOLE_CONNECTION_LOST')
            console.error('Database connection was closed')
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('Database has too many connections')
        if (err.code === 'ECONNREFUSED')
            console.error('Dababase Connection was refused')
    }
    tables.map((query)=>{
        connection.query(query, function(err){
            if(err) throw new Error(err)
            console.log('userTable is created')
            connection.release();
        });
    })
})