const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function (req, res, next) {
    try {
        const token = req.header('x-auth-token');       //getting the token from the headers in the axios request
        const verifedUser = jwt.verify(                 //verifying the token being sent with the secret jwt token to 
            token,                                      //validate authenticity
            config.get('jwtSecret')
        )
        req.user = verifedUser.user;
        next();                                         //pushes the user to the next process upon successful validation
    } catch (error) {
        console.log(error)
        return res.send({
            msg: "server error"
        })
    }
}