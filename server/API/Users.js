const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator')
const userSchema = require('../models/User')
const config = require('config');
const { response } = require('express');
// router.get('/', (req, res) => {
//     res.send("user endpoint")
// })

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

            if(user){
                return res.status(401).json({
                    msg: "Email already registered!"
                })
            }

            const salt = await bcryptjs.genSalt(15);
            password = await bcryptjs.hash(password, salt);

            user = new userSchema({
                name,
                phone,
                email,
                password
            })

            await user
                    .save()
                    .then(response => {
                        console.log("User Registered!")
                        console.log(response)
                        const payload = {
                            user: {
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
                //if no errors in the validation then this response is sent over.
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Server error!" })
        }
    })

    router.post(
        "/login",
        [   //validation of data being recieved
            check('email', 'Email is required').isEmail(),
            check('password', 'Password is required').not().isEmpty()
        ],
        async (req, res) => {
            try {
                let {email, password } = req.body;
                console.log(req.body)
    
                let user = await userSchema.findOne({
                    email: email
                }).then(response => {
                    console.log("found!", response)
                    console.log(response.password)
                    console.log(password)
                    let isPasswordMatch = bcryptjs.compare(response.password, password)
                    // res.send({ response });
                    if(isPasswordMatch){
                            
                        console.log("password match")
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
                                // if(error){
                                //     throw err
                                // } else {
                                //     console.log(token)
                                    
                                // }
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