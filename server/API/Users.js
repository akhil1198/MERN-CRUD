const express = require('express')
const config = require('config');
const { response } = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator')

//local imports
const userSchema = require('../models/User')
const auth = require('../middleware/MiddlewareAuth')

//functions
router.get(
    '/',
    auth,                                       //auth is used to verify the logged in user or if the token for the logged in user is still alive and then pushes to the next function
    async (req, res) => {                       //which is basically to this step where the logged in users information is retrieved
        try {
            const user = await userSchema.findById(req.user.id).select('-password')         //using -password will remove the hashed password from the response 
            res.json(user)
        } catch (error) {
            console.log(error)
        }

    }
)

router.post(
    '/register',
    [   //validation of data being recieved
        check('name', 'Name is required').isString(),
        check('phone', 'Phone is required').isMobilePhone(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
        //processing of data being sent to the endpoint
        try {
            let { name, phone, email, password } = req.body;
            // console.log(req.body)

            let user = await userSchema.findOne({
                email: email
            })

            if (user) {                   //if the user is registered then the email will be send in the user response
                return res.status(401).json({
                    msg: "Email already registered!"
                })
            }

            const salt = await bcryptjs.genSalt(15);                //using bycryptjs here to hash the password
            password = await bcryptjs.hash(password, salt);         //hashing the passwords for better security when storing

            user = new userSchema({
                name,
                phone,
                email,
                password
            })

            await user
                .save()                         //registering the user data here
                .then(response => {
                    console.log("User Registered!")
                    console.log(response)
                    const payload = {           //payload containing the user id is sent while creating a token in the 
                        user: {                 //jwt.sign method which will send the token as a response
                            id: user.id
                        }
                    }

                    jwt.sign(
                        payload,
                        config.get('jwtSecret'),
                        (err, token) => {
                            res.json({ "token": token });

                            // if(error){
                            //     throw err
                            // } else {
                            // }
                        }
                    )

                })
                .catch(err => {
                    console.log(err)
                })


            const error = validationResult(req)
            if (!error.isEmpty()) {    //checks if any error in the validation process for the data recieved in the request
                return res.status(401).json({ errors: error.array() })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Server error!" })
        }
    }
)

router.post(
    "/login",
    [   //validation of data being recieved
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req, res) => {
        try {
            let { email, password } = req.body;
            console.log(req.body)

            let user = await userSchema.findOne({
                email: email
            })
                .then(response => {
                    console.log("found!", response)

                    let isPasswordMatch = bcryptjs.compare(response.password, password)  //comparing the password in the response
                    // res.send({ response });                                           //with bcryptjs's compare method with the password sent in the request body
                    if (isPasswordMatch) {

                        console.log("password match")
                        //if password is matched then the payload with id of the user is sent over to get the token from jwt.sign
                        const payload = {
                            user: {
                                id: response._id
                            }
                        }
                        console.log(payload)

                        jwt.sign(
                            payload,
                            config.get('jwtSecret'),
                            (err, token) => {
                                res.send({ "token": token });
                            }
                        )
                    }
                })
                .catch(err => {
                    console.log(err)
                })

            const error = validationResult(req)
            if (!error.isEmpty()) {    //checks if any error in the validation process for the data recieved in the request
                return res.status(401).json({ errors: error.array() })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Server error!" })
        }
    }
)

module.exports = router