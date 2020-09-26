const express = require("express");
var app = express();
const cors = require("cors")
const http = require("http").createServer(app);

//local imports
const connection = require('./config/connection')
const users = require('./API/Users')

connection();           //calling the connection function here to connect to the mongoDB 

app.use(express.json({ extended: false }));

app.use(        //cors to enable cross origin sharing of data from front end to backend 
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

//visitor api

app.use("/api/users", users); //api to fetch the user details with token 

app.use("/api/users/register", users); //api to register users 

app.use("/api/users/login", users); //api to login users

// app.use("/api/users/signout", users); //api to signout users

app.use("/", (req, res) => {
    res.send("Hello World form NodeJS express.");
});


http.listen(5000, () => console.log("Server started on port 5000"));
