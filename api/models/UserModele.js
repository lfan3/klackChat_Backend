const bcrypt = require('bcrypt')
const saltRounds = 10

class UserModele {
    constructor(data){
        let password = bcrypt.hashSync(data.password, saltRounds)
        this.password = password
        this.pseudo = data.pseudo
        this.email = data.email
    }
    //todo: check the input
    addUser(){
        return `INSERT INTO user(pseudo, email, password) VALUES('${this.pseudo}', '${this.email}', '${this.password}')`
    }
    static getAllUsers(){
        return `SELECT * FROM user`
    }
    static findUserByEmail(email){
        return `SELECT * FROM user WHERE email = '${email}'`
    }
}
module.exports = UserModele
