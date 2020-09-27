import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import VideocamIcon from "@material-ui/icons/Videocam";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import Home from "./Home";

const colorHashtags = ["entry", "exit", "canteen", "class"];

function Alert(props) {
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Edituserdetails(props) {
  const classes = useStyles();
  const [ipcam, setIpcam] = useState([])
  const [docid, setDocid] = useState()
  const [editID, setEditID] = useState()
  // console.log(docID)

  useEffect(() => {
    
  }, [])

  const [ipAddress, setIPAddress] = useState(props.data);
  const [classOfPlaceInstalled, setClassOfPlaceInstalled] = useState(props.place);
  const [sectionOfPlaceInstalled, setSectionOfPlaceInstalled] = useState(props.section);
  const [hashtag, setHashtag] = useState(props.hashtag);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [content, setContent] = React.useState(
    "IP Camera successfully registered"
  );
  const [goBack, setGoback] = useState(false)

  if (goBack === true) {
    return <Home />
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if (ipAddress === "" || hashtag === "") {
      setSeverity("error");
      setContent("Please fill all the details!");
      setOpen(true);
    } else {

      
    }
  };

  const handleRemove = e => {
    e.preventDefault();
    

  }

  console.log(props.data)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='w3-animate-bottom'>
      <Grid container spacing={12}>
        <Grid item style={{ marginLeft: "5%" }}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Edit IPcamera details here
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ipAddress"
                label="IP Address"
                name="ipAddress"
                autoComplete="ipAddress"
                autoFocus
                value={ipAddress}
                style={{ marginBottom: "10px" }}
                onChange={e => setIPAddress(e.target.value)}
              />
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel>Class</InputLabel>
                    <Select
                      labelId="class"
                      id="class"
                      onChange={e => setClassOfPlaceInstalled(e.target.value)}
                      value={classOfPlaceInstalled}
                      defaultValue={sectionOfPlaceInstalled}
                    >
                      <option value={10}>X</option>
                      <option value={11}>XI</option>
                      <option value={12}>XII</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel>Section</InputLabel>
                    <Select
                      labelId="section"
                      id="section"
                      onChange={e => setSectionOfPlaceInstalled(e.target.value)}
                      value={sectionOfPlaceInstalled}
                      defaultValue={sectionOfPlaceInstalled}
                    >
                      <option value={"A"}>A</option>
                      <option value={"B"}>B</option>
                      <option value={"C"}>C</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    Suggested Hashtags:
                {colorHashtags.map(hashtag => (
                    <Chip
                      label={`#${hashtag}`}
                      style={{
                        margin: "3px",
                        color: hashtag === "yellow" ? "gold" : hashtag
                      }}
                      variant="outlined"
                      onClick={() => {
                        setHashtag(`#${hashtag}`);
                      }}
                    />
                  ))}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    id="Hashtag"
                    label="Insert # Hashtag"
                    fullWidth
                    name="Hashtag"
                    autoComplete="Hashtag"
                    onChange={e => setHashtag(e.target.value)}
                    value={hashtag}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Configurations
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRemove}
              >
                Delete  Configurations
              </Button>
              <Button
                type="submit"
                fullWidth
                onClick={() => {
                  setGoback(true)
                }}
              >
                Back
              </Button>
            </form>
          </div>
        </Grid>


        {/* <Grid item md={6} style={{ marginLeft: "7%" }}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Current IP Camera Configurations
          </Typography>
            <IPtable settings={props.settings} />
          </div>

        </Grid> */}
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {content}
        </Alert>
      </Snackbar>
    </div>

  );
}
