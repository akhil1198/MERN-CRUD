//package imports
import React, { useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

//material-ui imports
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//actions
import {registerUser} from '../actions/Auth'

//local imports
import './landings.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const SignUp = ({ isLoggedin, registerUser }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        password2: '',
        loggedin: false,
        errors: {},
    });             //using formdata for recording values from the form

    const { name, phone, email, password, password2, errors } = formData;           //destructuring the formdata for ease of acess

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitRegister = (e) => {
        e.preventDefault();

        if (name === "" && phone === "") return alert("Empty values");
        else registerUser(name, phone, email, password);

        // let data = {
        //     name: name,
        //     phone: phone,
        //     email: email,
        //     password: password
        // };
        // const url = "http://localhost:5000/api/users/register"
        // console.log(data);
        // try {
        //     axios
        //         .post(url, data)
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(err => {
        //             alert(err)
        //         })
        // } catch (error) {
        //     // alert(error);
    }



    return (
        <div>
            <Typography variant="h1" style={{ margin: "2%" }}>
                User Management System
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>

                    <div className="card w3-animate-bottom">
                        <Paper elevation={3} style={{ padding: "3%" }}>
                            <Typography id="title">Welcome!</Typography>
                            <Typography id="text" >Register</Typography>
                            <form onSubmit={onSubmitRegister}>
                                <div>
                                    <TextField
                                        id='name'
                                        autoFocus
                                        label="Enter Name"
                                        value={name}
                                        type='name'
                                        name='name'
                                        onChange={(e) => onChange(e)}
                                        variant='outlined'
                                        style={{ margin: "2%", width: "50%" }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id='phone'
                                        label="Enter Phone"
                                        value={phone}
                                        type='phone'
                                        name='phone'
                                        onChange={(e) => onChange(e)}
                                        variant='outlined'
                                        style={{ margin: "2%", width: "50%" }}
                                        error={
                                            !/^[0-9]+$/.test(phone) && phone !== ""
                                        }
                                        helperText={
                                            !/^[0-9]+$/.test(phone) && phone !== ""
                                                ? "Invalid contact number"
                                                : phone.length !== 10 && phone !== ""
                                                    ? "Should consist of 10 digits"
                                                    : ""
                                        }
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id='email'
                                        label="Enter Email"
                                        value={email}
                                        type='email'
                                        name='email'
                                        onChange={(e) => onChange(e)}
                                        variant='outlined'
                                        style={{ margin: "2%", width: "50%" }}
                                        error={
                                            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                                email
                                            ) && email !== ""
                                        }
                                        helperText={
                                            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                                email
                                            ) && email !== ""
                                                ? "Invalid email"
                                                : ""
                                        }
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id='password'
                                        label="Enter Password"
                                        value={password}
                                        type='password'
                                        name='password'
                                        onChange={(e) => onChange(e)}
                                        variant='outlined'
                                        style={{ margin: "2%", width: "50%" }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        className={classes.textField}
                                        required
                                        fullWidth
                                        variant='outlined'
                                        name='password2'
                                        label='Confirm Password'
                                        type='password'
                                        id='password2'
                                        autoComplete='confirm-password'
                                        value={password2}
                                        style={{ margin: "2%", width: "50%" }}
                                        onChange={(e) => onChange(e)}
                                        error={password2 !== password && password2 !== ''}
                                        helperText={
                                            password2 !== password && password2 !== ''
                                                ? 'Passwords do not match'
                                                : ''
                                        }
                                    />
                                </div>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    style={{ marginTop: "2%" }}
                                >
                                    <Box fontSize={16}>Sign Up</Box>
                                </Button>
                            </form>
                            <Typography style={{ margin: "3%" }}>
                                <Box>
                                    Already have an account?{' '}
                                    <a href='/' id="href">
                                        Click here
                                    </a>{' '}
                                    to Log-In{' '}
                                </Box>
                            </Typography>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>


        </div>
    );
}

const mapStateToProps = state => ({
    isLoggedin: state.isLoggedin
})

export default connect(mapStateToProps, { registerUser })(SignUp);