import React, {useState} from 'react';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './landings.css'
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { Link } from 'react-router-dom';

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

const Landing = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        loggedin: false,
        errors: {},
    });

    const { name, email, password, errors } = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitLogin = (e) => {
        e.preventDefault();

        let data = {
          email: email,
          password: password
        };
        const url = "http://localhost:5000/api/users/login"
        console.log(data);
        try {
            axios
              .post(url, data)
              .then(response => {
                console.log(response)
              })
              .catch(err => {
                alert(err)
              })
        } catch (error) {
          // alert(error);
        }
    }


    return ( 
        <div>
            <Typography variant="h1" style={{ margin: "2%"}}>
              User Management System
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    
                </Grid>
                <Grid item xs={6}>
                    
                    <div className="card w3-animate-bottom">
                        <Paper elevation={3} style={{ padding: "3%"}}>
                            <Typography id="title">Welcome!</Typography>
                            <Typography id="text" >Sign In</Typography>
                            <form onSubmit={onSubmitLogin}>
                              <div>
                                <TextField
                                  id='email'
                                  name="email"
                                  autoFocus
                                  label="Enter Email"
                                  value={email}
                                  type='email'
                                  onChange={(e) => onChange(e)}
                                  variant='outlined'
                                  style={{ margin: "2%", width: "50%"}}
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
                                  name="password"
                                  type='password'
                                  onChange={(e) => onChange(e)}
                                  variant='outlined'
                                  style={{ margin: "2%", width: "50%"}}
                                />
                              </div>
                              <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                style={{ marginTop: "2%"}}
                              >
                                <Box fontSize={16}>Log In</Box>
                              </Button>
                            </form>
                           <Typography style={{ margin: "3%"}}>
                              <Box>
                                Don't have an account?{' '}
                                <a href='/signup' id="href">
                                  Click here
                                </a>{' '}
                                to Sign Up{' '}
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
 
export default Landing;