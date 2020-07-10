require('dotenv').config()

const db = require('../../migration')
const UserModele = require('../models/UserModele')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    /**
     * user register, store user details
     */
    userRegister : (req, res, next)=>{
        const userData = {
            pseudo : req.body.pseudo,
            password: req.body.password,
            email : req.body.email
        }
        const user = new UserModele(userData)
        console.log(userData)
        db.query(UserModele.findUserByEmail(userData.email), (err, result)=>{
            if(err)
                next(err)
            else{
                if(result.length == 0){
                    db.query(user.addUser(), (err, result)=>{
                        if(err){
                            next(err)
                        }
                        else{
                            res.json({status: "success", message:'user has been added successfully'})
                        }
                    })
                }else{
                    res.json({status: "error", message: "information is not correct"})
                }
            }
        })
    },

    authentication: (req, res, next)=>{
        let pseudo = req.body.pseudo
        let email = req.body.email
        let password = req.body.password

        db.query(UserModele.findUserByEmail(email), (err, result)=>{
            if(err)
                next(err)
            else{
                //res.send(result)
                let user = result[0]
                if(user && bcrypt.compareSync(password, user.password)){
                    let signature = {pseudo}
                    const accessToken = jwt.sign(signature, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
                    res.json({status: "success", token:accessToken})
                }else if(!user){
                    res.json({status:'error', message:'no such user'})
                }else{
                    res.json({status:"error", message: "invalide password"})
                }
            }
        })  
    }
}