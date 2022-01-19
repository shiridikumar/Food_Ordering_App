var express = require("express");
var router = express.Router();
const items = require("./../models/Users")
const vendors=require("./../models/Vendors")

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    console.log("1234566789");
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db

router.get("/vendors",(req,res)=>{
    console.log("vendors called");
    var names;
    var pics;
    let s={};
    vendors.distinct("pic",(err,result)=>{
        s.pics=result;
        vendors.distinct("shop_name",(err,result)=>{
            s.names=result;
            res.send(s);
        })
    });
})
router.post("/register", (req, res) => {
    console.log(req.body.name);
    console.log(req.body)
    const newUser = new User({
        name: req.body.name,
        price: req.body.price,
        item:req.body.item,
        pic:req.body.pic,
        type:req.body.type

    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
	});
});

router.post("/canteen",(req,res)=>{
    console.log(req.body);
    vendors.findOne({"shop_name":req.body.canteen}).then(result=>{
        if(!(result)){
            res.status(404).json({error:"canteen not found"});
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})

module.exports = router;
