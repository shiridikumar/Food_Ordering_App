var express = require("express");
var router = express.Router();

// GET request 
// Just a test API to check if server is working properly or not
router.get("/", function(req, res) {
    console.log("hasdasdadfs sdsd");
	res.send("hwllo akanksha i love u");
});

module.exports = router;