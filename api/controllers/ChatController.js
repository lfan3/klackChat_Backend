require('dotenv').config()

const db = require('../../migration')

module.exports = {
    valideUser : (req, res, next)=>{
        res.json({status:'success', data:req.user})
    }
}
