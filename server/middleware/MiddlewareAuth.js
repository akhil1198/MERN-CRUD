const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function(req, res, next) {
    try {
        const token = req.header('x-auth-token');
        const verifedUser = jwt.verify(
            token,
            config.get('jwtSecret')
        )
        req.user = verifedUser.user;
        next();
    } catch (error) {
        console.log(error)
        return res.send({
            msg: "server error"
        })
    }
}