const jwt  = require('jsonwebtoken')


module.exports = function(req,res,next){
    try {
       let token = req.header('x-token')
       if(!token){
        return res.status(400).send("Token Not Found")
       } 

       let decodedtoken = jwt.verify(token,'jwtsecurepassword')

       req.user =  decodedtoken.user
       next()
    } catch (error) {
        console.log("error",error)
    }
}