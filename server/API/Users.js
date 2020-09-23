const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
    res.send("user endpoint")
})

router.post('/register',
    [   //validation of data being recieved
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
        //processing of data being sent to the endpoint
        try {
            const { email, password } = req.body;
            const error = validationResult(req)
            if (!error.isEmpty()) {    //checks if any error in the validation process for the data recieved in the request
                return res.status(401).json({ errors: error.array() })
            }
            res.send("Works!")         //if no errors in the validation then this response is sent over.
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Server error!" })
        }
    })

module.exports = router