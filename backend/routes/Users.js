var express = require("express");
var router = express.Router();
const items = require("./../models/Users")
const vendors = require("./../models/Vendors")

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users

router.get("/vendors", (req, res) => {
    console.log("vendors called");
    var names;
    var pics;
    let s = {};
    vendors.distinct("pic", (err, result) => {
        s.pics = result;
        vendors.distinct("shop_name", (err, result) => {
            s.names = result;
            res.send(s);
        })
    });
})
router.post("/register", (req, res) => {
    console.log(req.body.name);
    console.log(req.body);
    const email = req.body.email;
    User.findOne({ "email": email }).then(user => {
        if (user) {
            res.status(404).json({ error: "Email id alredy registered" })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                contact_number: req.body.contact,
                age: req.body.age,
                batch: req.body.batch,
                password: req.body.password

            });
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        }
    })

});



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
        else {
            if (user.password == req.body.password) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({
                    error: "Invalid username or password"
                });
            }
            return user;
        }
    });
});

router.post("/canteen", (req, res) => {
    console.log(req.body);
    vendors.findOne({ "shop_name": req.body.canteen }).then(result => {
        if (!(result)) {
            res.status(404).json({ error: "canteen not found" });
        }
        else {
            console.log(result);
            res.send(result);
        }
    })
})

module.exports = router;
