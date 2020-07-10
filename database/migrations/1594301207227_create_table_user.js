module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS user(\
        id INT NOT NULL AUTO_INCREMENT,\
        pseudo VARCHAR(50) NOT NULL,\
        email VARCHAR(50) NOT NULL,\
        password VARCHAR(255) NOT NULL,\
        PRIMARY KEY(id)\
    );",
    "down": "TRUNCATE TABLE user"
}