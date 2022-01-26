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
var hashedPassword = 'das';

/*
image upload
timings,rejection
*/

//--------------------------------------------------------Get vendors pics and names ----------------------------------------------------
router.get("/vendors", (req, res) => {
    ////log("vendors called");
    var names=[];
    var pics=[];
    let s = {};
    vendors.find().then(result=>{
        var obj=result;
        for(var i=0;i<result.length;i++){
            names.push(result[i].shop_name);
            pics.push(result[i].pic);
        }
        s.names=names;
        s.pics=pics;
        res.status(200).send(s);
    }) 
})


//-------------------------------------------------Get all vendors names---------------------------------------------------------
router.get("/all_vendors", (req, res) => {
    ////log("vendors request");
    vendors.distinct("shop_name", (err, result) => {
        res.send(result);
    });
})


//------------------------------------------------Registration of user------------------------------------------------------------------------
router.post("/userregister", (req, res) => {
    //log(req.body.name);
    //log(req.body);
    const email = req.body.email;
    var password;

    User.findOne({ "email": email }).then(user => {
        if (user) {
            //log("already registered");
            res.status(404).json({ error: "Email id alredy registered" })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                contact_number: req.body.contact_number,
                age: req.body.age,
                batch: req.body.batch,
                password: req.body.password,
                wallet:0
            });
            bcrypt.genSalt(10, async function (err, Salt) {
                bcrypt.hash(req.body.password, Salt, async function (err, hash) {
                    if (err) {
                        return //log('Cannot encrypt');
                    }
                    vendors.updateOne({ shop_name: req.body.name }, { $set: { password: hash } }).then(response => {
                        //log("success");
                    })
                    newUser.password = hash;
                    newUser.save().then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        //log(err);
                        res.status(400).send(err);
                    });
                })
            })
            //log(password);
        }
    })
        .catch(err => {
            //log(err);
        })
});
//------------------------------------------------------------------Registration of vendor-------------------------------------------------
router.post("/vendorregister", (req, res) => {
    //log(req.body.name);
    //log(req.body);
    const email = req.body.email;
    var password;

    vendors.findOne({ "email": email }).then(user => {
        if (user) {
            //log("already registered");
            res.status(404).json({ error: "Email id alredy registered" })
        }
        else {
            const newvendor = new vendors({
                shop_name: req.body.shop_name,
                email: req.body.email,
                phone: req.body.phone,
                manager_name: req.body.manager_name,
                password: req.body.password,
                starttime:req.body.starttime,
                endtime:req.body.endtime
            });
            newvendor["pic"]="no.png";
            bcrypt.genSalt(10, async function (err, Salt) {
                bcrypt.hash(req.body.password, Salt, async function (err, hash) {
                    if (err) {
                        return //log('Cannot encrypt');
                    }
                    vendors.updateOne({ shop_name: req.body.name }, { $set: { password: hash } }).then(response => {
                        //log("success");
                    })
                    newvendor.password = hash;
                    newvendor.save().then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        //log(err);
                        res.status(400).send(err);
                    });
                })
            })
            //log(password);
        }
    })
        .catch(err => {
            //log(err);
        })

});


router.post("/addfav",(req,res)=>{
    console.log(req.body);
    User.updateOne({email:req.body.email},{$set:{"favourites":req.body.fav}}).then(result=>{
        res.status(200).send("Succesful");
    
    })
    .catch(err=>{
        console.log(err);
    })

})


// --------------------------------------------------Login of user-----------------------------------------------
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
                    //log("both are same");
                }
                else {
                    //log("error");
                    res.status(404).send("Invalid Credentials");
                }
                if (err) {
                    //log(err);
                }
            })
        }
    });
});

//-------------------------------------------------------------get user details------------------------------------------------------------------

router.post("/userdetails",(req,res)=>{
    User.findOne({"email":req.body.email}).then(result=>{
        res.status(200).send(result);
    })
    .catch(err=>{
        //log(err);
    })
})

//--------------------------------------------------------------add money to wallet----------------------------------------------------------------------------

router.post("/addwallet",(req,res)=>{

    User.updateOne({"email":req.body.email},{$set:{wallet:req.body.actual+parseInt(req.body.wallet)}}).then(result=>{
        res.status(200).send(result);
    })
    .catch(err=>{
        console.log(err);
    })
})

//--------------------------------------------------------------Get canteen details ---------------------------------------------------------------
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



//----------------------------------------------------------------------------Update a buyer profile-------------------------------------------------------------
router.post("/update_user", (req, res) => {
    var details = req.body;
    bcrypt.genSalt(10, async function (err, Salt) {
        bcrypt.hash(req.body.password, Salt, async function (err, hash) {
            if (err) {
                return //log('Cannot encrypt');
            }
            vendors.updateOne({ shop_name: req.body.name }, { $set: { password: hash } }).then(response => {
                //log("success");
            })
            hashedPassword = hash;
            if(req.body.password!=req.body.actual){
                details.password = hashedPassword;
            }
            User.updateOne({ email: req.body.email }, { $set: details }).then(result => {
                res.status(200).send("Succesful");
            })
                .catch(err => {
                    res.status(404).send("something went wrong plese try again later");
                })
        })
    })
})


//---------------------------------------------------------------------update a vendor profile----------------------------------------------------------
router.post("/update_vendor", (req, res) => {
    var details = req.body;
    bcrypt.genSalt(10, async function (err, Salt) {
        bcrypt.hash(req.body.password, Salt, async function (err, hash) {
            if (err) {
                return //log('Cannot encrypt');
            }
            vendors.updateOne({ shop_name: req.body.name }, { $set: { password: hash } }).then(response => {
                //log("success");
            })
            hashedPassword = hash;
            if(req.body.password!=req.body.actual){
                details.password = hashedPassword;
            }
            vendors.updateOne({ shop_name: req.body.shop_name }, { $set: details }).then(result => {
                res.status(200).send("Succesful");
            })
                .catch(err => {
                    res.status(404).send("something went wrong plese try again later");
                })
        })
    })
})



// ---------------------------------------------------------------------Order an item---------------------------------------------------------------

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
        console.log(req.body);
        User.updateOne({"email":req.body.email},{$set:{wallet:req.body.wallet-req.body.cost}}).then(result=>{
            res.status(200).send("Succesfully placed your order")
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    })
        .catch(err => {
            ////log("order not getting placed");
            //log(err);
            console.log(err);
            res.status(404).send("Order not plaaced");

        })
})

// -----------------------------------------------------------------------------------get details for diplaying in myorders page----------------------------------------------
router.post("/myorders", (req, res) => {
    orders.find({ email: req.body.email }).then(result => {
        res.status(200).send(result);
    });

})

//-----------------------------------------------------------------------------------rate flag for an order------------------------------------------------------------
router.post("/rate",(req,res)=>{
    console.log(req.body);
    orders.updateOne({_id:req.body.orderid},{$set:{rating:1}}).then(result=>{
        const rating=((req.body.rated*req.body.original)+req.body.rating)/(req.body.rated+1);
        foods.updateOne({shop_name:req.body.shop_name,name:req.body.food},{$set:{rating:rating,rated:req.body.rated+1}}).then(response=>{
            console.log("succesful");
            res.status(200).send("succesful");

        })
        .catch(err=>{
            console.log(err);
        })


    })
    .catch(err=>{
        console.log(err);
    })
})




//-------------------------------------------------------------------------------------Deatils of a specific food item----------------------------------------------------------------------
router.post("/itemdetails", (req, res) => {
    console.log(req.body);
    foods.findOne({ shop_name: req.body.canteen, name: req.body.item }).then(result => {
        const required = result.items;
        ////log(result);
        ////log("dddddddddddddddddddddddddddd");
        res.status(200).send(result);
    })
        .catch(err => {
            res.status(404).send("errrror");
            console.log(err);
        })
})


//------------------------------------------------------------------------------Filter food items by search------------------------------------------------------------
router.post("/filter", (req, res) => {
    //log(req.body);
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
            //log(err);
            res.status(404).send("error")
        })
})

//------------------------------------------------------------------------------------Search a food item by name------------------------------------------------------
router.post("/searchByname", (req, res) => {
    //log(req.body);
    foods.find({ name: req.body.name }).collation({ locale: 'en', strength: 2 }).then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
            res.status(404).send("error");
        })
})

//------------------------------------------------------------------------------------Vendor login ---------------------------------------------------------------------
router.post("/vendorlogin", (req, res) => {
    const email = req.body.email;
    //log(req.body)
    vendors.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).send("Invalid credentials")
        }
        else {
            bcrypt.compare(req.body.password, user.password, async function (err, isMatch) {
                if (isMatch) {
                    res.status(200).send(user)
                    //log("both are same");
                }
                else {
                    //log("error");
                    res.status(404).send("Invalid Credentials");
                }
                if (err) {
                    //log(err);
                }
            })
        }
    })
        .catch(err => {
            //log(err);
        })
});

//----------------------------------------------------------------------------------------Display pending orders in vendors-------------------------------------------------------------------
router.post("/pending-orders", (req, res) => {
    //log(req.body);
    orders.find({ shop_name: req.body.shop_name }).then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
            //log(err);
            res.status(404).send("Error");
        })
})

//-------------------------------------------------------------------------------------------Reject Stage-----------------------------------------------------------------------------------------------------
router.post("/rejectstage",(req,res)=>{

    orders.updateOne({ _id: req.body.orderid }, { $set: { status: "Rejected" } }).then(result=>{
        res.status(200).send("Rejected");
    }).catch(err=>{
        console.log(err);
    })
})










//------------------------------------------------------------------------------------------Move stage of  pending order-------------------------------------------------------------------------------
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
        //log(result);
        const req_stage = stages[stage_indices[result.status] + 1]
        orders.updateOne({ _id: req.body.orderid }, { $set: { status: req_stage } }).then(response => {
            res.status(200).send(req_stage);
        })
            .catch(err => {
                //log(err);
                res.status(404).send("error");
            })
    })
        .catch(err => {
            //log(err);
            res.status(404).send("errroor");
        })
})
//-------------------------------------------------------------------------------------------Pickup order-----------------------------------------------------------------------
router.post("/pickorder",(req,res)=>{
    console.log(req.body);
    orders.updateOne({ _id: req.body.orderid }, { $set: { status: "Completed" } }).then(result=>{
        res.status(200).send("Completed");
    }).catch(err=>{
        console.log(err);
    })

})













//-----------------------------------------------------------------------------------------edit details of an item-----------------------------------------------------
router.post("/edititem", (req, res) => {
    //log(req.body);
    vendors.findOne({ shop_name: req.body.shop_name }).then(response => {
        var obj = response.items;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].name == req.body.original) {
                obj[i].name = req.body.name; obj[i].item = req.body.item; obj[i].price = parseInt(req.body.price); obj[i].type = req.body.type;
                break;
            }
        }
        //log(obj);
        vendors.updateOne({ shop_name: req.body.shop_name }, { $set: { items: obj } }).then(result => {


        })
            .catch(err => {
                //log("unsucesful");
            })
    })
        .catch(err => {
            //log(err);
        })

    foods.updateOne({ name: req.body.original }, { $set: { price: req.body.price, name: req.body.name, item: req.body.item, type: req.body.type } }).then(response => {

    })
        .catch(err => {
            //log(err);
        })
})


//---------------------------------------------------------------------------------Display all items under vendor------------------------------------------------------
router.post("/vendoritems", (req, res) => {
    //log(req.body);
    foods.find({ shop_name: req.body.shop_name }).then(response => {
        res.status(200).send(response);
    })
        .catch(err => {
            //log(err);
        })
})

//-----------------------------------------------------------------------------------------------------Delete an item under a vendor menu-------------------------------------------------
router.post("/deleteitems", (req, res) => {
    foods.remove({ shop_name: req.body.shop_name, name: req.body.name }).then(response => {
        //log("succesful");
        res.status(200).send("succesful");
    })
        .catch(err => {
            //log(err);
        })

    orders.remove({ shop_name: req.body.shop_name, food: req.body.name }).then(response => {
        //log("succesfully deleted");
        res.status(200).send("succesful");
    })
        .catch(err => {
            //log("error");
        })

})

//------------------------------------------------------------Image upload-------------------------------------------------------------------
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


// ------------------------------------------Add A new item in vendors menu----------------------------------------------------------
router.post("/newitem", (req, res) => {
    //log(req.body);
    req.body["pic"] = "no.png";
    req.body["rating"] = 0;
    //log(req.body);
    foods.insertOne(req.body);
    res.status(200).send("succesful");
})

// ------------------------------------------Get ALL tags in user filter------------------------------------------
router.get("/alltags", (req, res) => {
    const obj = {};
    foods.find().then(response => {
        //log(response);
        for (var i = 0; i < response.length; i++) {
            //log(response[i]);
            for (var j = 0; j < response[i].item.length; j++) {
                obj[response[i].item[j]] = 1;
                //log(obj);
            }
        }
        //log(Object.keys(obj));
        res.send(Object.keys(obj));
    })
        .catch(err => {
            //log(err);
        })
})
//----------------------------------------------------------------------encrypt Api for testing--------------------------------------------------------------
router.post("/encrypt", async (req, res) => {
    bcrypt.genSalt(10, async function (err, Salt) {
        bcrypt.hash(req.body.password, Salt, async function (err, hash) {
            if (err) {
                return //log('Cannot encrypt');
            }
            vendors.updateOne({ shop_name: req.body.name }, { $set: { password: hash } }).then(response => {
                res.status(200).send(hash);
            })
            .catch(err=>{
                console.log(err);
            })
            hashedPassword = hash;
            //log(hashedPassword);
        })
    })
})

//---------------------------------------------------------------------------------Most sold 5 products------------------------------------------------

router.post("/mostsold",(req,res)=>{
    orders.aggregate([
        {$match:{shop_name:req.body.name,status:'Completed'}},
        {$group:{_id:"$food",count:{$sum:1}}},{$sort:{count:-1}},{$limit:5}
    ]).then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        console.log(err);
    })
})


router.post("/statuscount",(req,res)=>{
    var obj={}
    orders.aggregate([
        {$match:{shop_name:req.body.name}},
        {$group:{_id:0 ,count:{$sum:1}}}
    ]).then(result=>{
        if(result.length>0){
            obj["Placed"]=result[0].count;
        }
        else{
            obj["Placed"]=0;
        }
        orders.aggregate([
            {$match:{shop_name:req.body.name,status:'Completed'}},
            {$group:{_id:0 ,count:{$sum:1}}}
        ]).then(response=>{
            if(response.length>0){
                obj["Completed"]=response[0].count;
            }
            else{
                obj["Completed"]=0;
            }
            orders.aggregate([
                {$match:{shop_name:req.body.name,$and: [{ status: { $ne: 'Completed' } }, { status: { $ne: 'Rejected' } }]}} ,{$group:{_id:0 ,count:{$sum:1}}}
            ]).then(resp=>{
                if(resp.length>0){
                    obj["Pending"]=resp[0].count;
                }
                else{
                    obj["Pending"]=0;
                }
                console.log(obj);
                res.status(200).send(obj);
            })
            .catch(errr=>{
                console.log(errr);
            })
        })
        .catch(error=>{
            console.log(error);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})




module.exports = router;

