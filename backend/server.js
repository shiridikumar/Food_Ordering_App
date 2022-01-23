const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "vnu"
var UserRouter = require("./routes/Users");
var initialpage=require("./initialpage");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
}) 
// setup API endpoints


app.use("/user", UserRouter);
app.use("/",initialpage);


//https://www.geeksforgeeks.org/python-check-url-string/#:~:text=To%20find%20the%20URLs%20in,returned%20in%20the%20order%20found.
app.listen(PORT, function() {
    console.log("hello akanksha");
});
