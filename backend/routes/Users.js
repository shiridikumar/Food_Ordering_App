var express = require("express");
var router = express.Router();
const items = require("./../models/Users")
const vendors = require("./../models/Vendors")
const orders = require("./../models/Orders")
const User = require("../models/Users");
const foods = require("./../models/food_items");
const { response } = require("express");
const { db } = require("./../models/Users");
const path = require("path")
const bcrypt = require('bcryptjs');
const multer = require("multer");

router.get("/vendors", (req, res) => {
    //console.log("vendors called");
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

router.get("/all_vendors", (req, res) => {
    //console.log("vendors request");
    vendors.distinct("shop_name", (err, result) => {
        res.send(result);
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
            bcrypt.compare(req.body.password, user.password, async function (err, isMatch) {
                if (isMatch) {
                    res.status(200).send(user)
                    console.log("both are same");
                }
                else {
                    console.log("error");
                    res.status(404).send("Invalid Credentials");
                }
                if(err){
                    console.log(err);
                }
            })
        }
    });
});

router.post("/canteen", (req, res) => {
    vendors.findOne({ "shop_name": req.body.canteen }).then(result => {
        if (!(result)) {

            res.status(404).json({ error: "canteen not found" });
        }
        else {
            res.send(result);
        }
    })
})


router.post("/update_user", (req, res) => {
    var details=req.body;
    bcrypt.genSalt(10, async function (err, Salt) {
        bcrypt.hash(req.body.password, Salt, async function (err, hash) {
            if (err) {
                return console.log('Cannot encrypt');
            }
            vendors.updateOne({shop_name:req.body.name},{$set:{password:hash}}).then(response=>{
                console.log("success");
            })
            hashedPassword = hash;
            details.password=hashedPassword;
            User.updateOne({ email: req.body.email }, { $set: details }).then(result => {
                res.status(200).send("Succesful");
            })
            .catch(err => {
                    res.status(404).send("something went wrong plese try again later");
            })
        })
    })

   

})


router.post("/order", (req, res) => {
    const new_order = new orders({
        email: req.body.email,
        shop_name: req.body.shop_name,
        food: req.body.food_item,
        quantity: req.body.quantity,
        cost: req.body.cost,
        Time: req.body.order_Time,
        status: req.body.status
    })
    new_order.save().then(response => {
        res.status(200).send("Succesfully placed your order");
    })
        .catch(err => {
            //console.log("order not getting placed");
            console.log(err);
            res.status(404).send("Order not plaaced");

        })
})


router.post("/myorders", (req, res) => {
    orders.find({ email: req.body.email }).then(result => {
        res.status(200).send(result);
    });

})

router.post("/itemdetails", (req, res) => {
    console.log(req.body);
    foods.findOne({ shop_name: req.body.canteen, name: req.body.item }).then(result => {
        const required = result.items;
        //console.log(result);
        //console.log("dddddddddddddddddddddddddddd");
        res.status(200).send(result);
    })
        .catch(err => {
            res.status(404).send("errrror");
            console.log(err);
        })
})

router.post("/filter", (req, res) => {
    console.log(req.body);
    const shop_queries = [];
    for (var i = 0; i < req.body.vendors.length; i++) {
        shop_queries.push({ shop_name: req.body.vendors[i] });
    }
    const tags_queries = [];
    for (var i = 0; i < req.body.tags.length; i++) {
        tags_queries.push({ item: req.body.tags[i] });
    }
    var max_price = req.body.max_price;
    const min_price = req.body.min_price;
    if (!max_price) {
        max_price = Infinity;
    }
    const price_sort = req.body.price_sort;
    const rating_sort = req.body.rating_sort;

    const veg_queries = [];
    for (var i = 0; i < req.body.vegs.length; i++) {
        veg_queries.push({ type: req.body.vegs[i] })
    }
    var tags = req.body.tags;

    foods.find({ $and: [{ $or: shop_queries }, { $or: veg_queries }, { price: { $lte: max_price } }, { price: { $gte: min_price } }] }).sort({ price: price_sort, rating: rating_sort }).then(result => {
        var obj = result;
        var l = []
        for (var i = 0; i < result.length; i++) {
            var flag = 0;
            for (var j = 0; j < tags.length; j++) {
                for (var k = 0; k < result[i].item.length; k++) {
                    if (result[i].item[k] == tags[j]) {
                        flag = 1;
                        l.push(result[i]);
                        break;
                    }
                }
                if (flag == 1) {
                    break;
                }
            }

        }
        res.status(200).send(l);

    })
        .catch(err => {
            console.log(err);
            res.status(404).send("error")
        })
})


router.post("/searchByname", (req, res) => {
    console.log(req.body);
    foods.find({ name: req.body.name }).collation({ locale: 'en', strength: 2 }).then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
            res.status(404).send("error");
        })
})


router.post("/vendorlogin", (req, res) => {
    const email = req.body.email;
    console.log(req.body)
    vendors.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).send("Invalid credentials")
        }
        else {
            bcrypt.compare(req.body.password, user.password, async function (err, isMatch) {
                if (isMatch) {
                    res.status(200).send(user)
                    console.log("both are same");
                }
                else {
                    console.log("error");
                    res.status(404).send("Invalid Credentials");
                }
                if(err){
                    console.log(err);
                }
            })
        }
    })
        .catch(err => {
            console.log(err);
        })
});


router.post("/pending-orders", (req, res) => {
    console.log(req.body);
    orders.find({ shop_name: req.body.shop_name, $and: [{ status: { $ne: 'Completed' } }, { status: { $ne: 'Rejected' } }] }).then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
            console.log(err);
            res.status(404).send("Error");
        })
})

router.post("/movestage", (req, res) => {
    const stages = [
        "Placed",
        "Accepted",
        "Cooking",
        "Ready for Pickup",
        "Completed",
        "Rejected"
    ]
    const stage_indices = {
        "Placed": 0,
        "Accepted": 1,
        "Cooking": 2,
        "Ready for Pickup": 3,
        "Completed": 4,
        "Rejected": 5
    }
    orders.findOne({ _id: req.body.orderid }).then(result => {
        console.log(result);
        const req_stage = stages[stage_indices[result.status] + 1]
        orders.updateOne({ _id: req.body.orderid }, { $set: { status: req_stage } }).then(response => {
            res.status(200).send(req_stage);
        })
            .catch(err => {
                console.log(err);
                res.status(404).send("error");
            })
    })
        .catch(err => {
            console.log(err);
            res.status(404).send("errroor");
        })
})


router.post("/edititem", (req, res) => {
    console.log(req.body);
    vendors.findOne({ shop_name: req.body.shop_name }).then(response => {
        var obj = response.items;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].name == req.body.original) {
                obj[i].name = req.body.name; obj[i].item = req.body.item; obj[i].price = parseInt(req.body.price); obj[i].type = req.body.type;
                break;
            }
        }
        console.log(obj);
        vendors.updateOne({ shop_name: req.body.shop_name }, { $set: { items: obj } }).then(result => {


        })
            .catch(err => {
                console.log("unsucesful");
            })
    })
        .catch(err => {
            console.log(err);
        })

    foods.updateOne({ name: req.body.original }, { $set: { price: req.body.price, name: req.body.name, item: req.body.item, type: req.body.type } }).then(response => {

    })
        .catch(err => {
            console.log(err);
        })
})

router.post("/vendoritems", (req, res) => {
    console.log(req.body);
    foods.find({ shop_name: req.body.shop_name }).then(response => {
        res.status(200).send(response);
    })
        .catch(err => {
            console.log(err);
        })
})
router.post("/deleteitems", (req, res) => {
    foods.remove({ shop_name: req.body.shop_name, name: req.body.name }).then(response => {
        console.log("succesful");
        res.status(200).send("succesful");
    })
    .catch(err => {
        console.log(err);
    })
    
    orders.remove({shop_name:req.body.shop_name,food:req.body.name}).then(response=>{
        console.log("succesfully deleted");
        res.status(200).send("succesful");
    })
    .catch(err=>{
        console.log("error");
    })

})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})
const maxSize = 4 * 1000 * 1000;
var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }
}).single("image");

router.post("/uploadpic", function (req, res, next) {
    upload(req, res, function (err) {

        if (err) {
            res.send(err)
        }
        else {
            res.send("Success, Image uploaded!")
        }
    })
})

router.post("/newitem", (req, res) => {
    console.log(req.body);
    req.body["pic"] = "no.png";
    req.body["rating"] = 0;
    console.log(req.body);
    foods.insertMany(req.body);
    res.status(200).send("succesful");
})

router.get("/alltags", (req, res) => {
    const obj = {};
    foods.find().then(response => {
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            for (var j = 0; j < response[i].item.length; j++) {
                obj[response[i].item[j]] = 1;
                console.log(obj);
            }
        }
        console.log(Object.keys(obj));
        res.send(Object.keys(obj));
    })
        .catch(err => {
            console.log(err);
        })
})
var hashedPassword = 'das';
const encryt_password = async (password) => {


}


router.post("/encrypt", async (req, res) => {
    bcrypt.genSalt(10, async function (err, Salt) {
        bcrypt.hash(req.body.password, Salt, async function (err, hash) {
            if (err) {
                return console.log('Cannot encrypt');
            }
            vendors.updateOne({shop_name:req.body.name},{$set:{password:hash}}).then(response=>{
                console.log("success");
            })
            hashedPassword = hash;
            console.log(hashedPassword);
        })
    })
})



const comapre = (password, orig) => {
   
}

module.exports = router;

