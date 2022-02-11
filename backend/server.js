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
mongoose.connect('mongodb://shiridikumar:2002meshiridi@cluster0-shard-00-00.qozki.mongodb.net:27017,cluster0-shard-00-01.qozki.mongodb.net:27017,cluster0-shard-00-02.qozki.mongodb.net:27017/vnu?ssl=true&replicaSet=atlas-z43jla-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
}) 
// setup API endpoints


app.use("/user", UserRouter);
app.use("/",initialpage);


//https://www.geeksforgeeks.org/python-check-url-string/#:~:text=To%20find%20the%20URLs%20in,returned%20in%20the%20order%20found.
app.listen(PORT, function() {
    console.log("App started to listen in port "+PORT);
});
