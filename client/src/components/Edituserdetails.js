import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

//package imports 
import axios from "axios";
import Moment from "moment";

//local imports
import Home from "./Home";

//material-ui imports
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Typography, Paper, TextField } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: theme.spacing(5),
  },
  tableContainer: {
    maxHeight: 500,
    maxWidth: 200,
  },
  AppBarDiv: {
    display: "flex",
    justifyContent: "spaceBetween",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    // flexShrink: 0,
    display: "flex",
    width: 270,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Edituserdetails(props) {
  const [goBack, setGoback] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const token = localStorage.getItem('token')
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: props.name,
    phone: props.phone,
    email: props.email,
    errors: {},
  });             //using formdata for recording values from the form

  const { name, phone, email, errors } = formData;           //destructuring the formdata for ease of acess

  console.log(formData)

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (goBack === true) {
    return <Home />
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenRemove(false);
    setOpenUpdate(false)
  };


  const handleRemove = e => {
    e.preventDefault();
    //remove information based on their ids
    let data = {
      id: props.id
    };
    const url = "http://localhost:8000/api/users/remove"
    console.log(data);
    try {
      axios
        .post(url, data, {
          headers: {
            'x-auth-token': token,
          }
        })
        .then(response => {
          console.log(response)
          console.log("removed")
          setOpenRemove(true)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    //update users information based on their ids
    let data = {
      id: props.id,
      name: name,
      phone: phone,
      email: email,
    };
    const url = "http://localhost:8000/api/users/update"
    console.log(data);
    try {
      axios
        .post(url, data, {
          headers: {
            'x-auth-token': token,
          }
        })
        .then(response => {
          console.log(response)
          console.log("updated")
          setOpenUpdate(true)
        })
        .catch(err => {
          alert(err)
        })
    } catch (error) {
      alert(error);
    }
  }


  return (
    <React.Fragment>
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
                <Typography variant="h3" style={{ margin: "2%" }}>
                  Edit user details here
                </Typography>
                <form className={classes.form} noValidate >
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
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "3%" }}
                    onClick={handleUpdate}
                  >
                    Update Details
                  </Button>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRemove}
                    style={{ marginTop: "3%" }}
                  >
                    Delete Details
                  </Button>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setGoback(true)
                    }}
                    style={{ marginTop: "3%" }}
                  >
                    Back
                  </Button>

                </form>

              </Paper>
            </div>
          </Grid>
          <Grid item xs={3}>

          </Grid>
        </Grid>
        <Dialog
          open={openUpdate}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              UPDATED!
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openRemove}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              DELETED!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}