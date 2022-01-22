var express = require("express");
var router = express.Router();
const items = require("./../models/Users")
const vendors = require("./../models/Vendors")
const orders=require("./../models/Orders")
const User = require("../models/Users");
const foods=require("./../models/food_items");
const { response } = require("express");

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

router.get("/all_vendors",(req,res)=>{
    //console.log("vendors request");
    vendors.distinct("shop_name",(err,result)=>{
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
    vendors.findOne({ "shop_name": req.body.canteen }).then(result => {
        if (!(result)) {
            res.status(404).json({ error: "canteen not found" });
        }
        else {
            //console.log(result);
            res.send(result);
        }
    })
})


router.post("/update_user",(req,res)=>{
    User.updateOne({email:req.body.email},{$set:req.body}).then(result=>{
        res.status(200).send("Succesful");
    })
    .catch(err=>{
        res.status(404).send("something went wrong plese try again later");
    })


})


router.post("/order",(req,res)=>{
    const new_order=new orders({
        email:req.body.email,
        shop_name:req.body.shop_name,
        food:req.body.food_item,
        quantity:req.body.quantity,
        cost:req.body.cost,
        Time:req.body.order_Time,
        status:req.body.status
    })
    new_order.save().then(response=>{
        res.status(200).send("Succesfully placed your order");
    })
    .catch(err=>{
        //console.log("order not getting placed");
        console.log(err);
        res.status(404).send("Order not plaaced");

    })
})


router.post("/myorders",(req,res)=>{
    orders.find({email:req.body.email}).then(result=>{
        res.status(200).send(result);
    });

})

router.post("/itemdetails",(req,res)=>{
    foods.findOne({shop_name:req.body.canteen,name:req.body.item}).then(result=>{
        const required=result.items;
        //console.log(result);
        //console.log("dddddddddddddddddddddddddddd");
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(404).send("errrror");
    })
})

router.post("/filter",(req,res)=>{
    console.log(req.body);
    const shop_queries=[];
    for (var i=0;i<req.body.vendors.length;i++){
        shop_queries.push({shop_name:req.body.vendors[i]});
    }
    const tags_queries=[];
    for(var i=0;i<req.body.tags.length;i++){
        tags_queries.push({item:req.body.tags[i]});
    }
    var max_price=req.body.max_price;
    const min_price=req.body.min_price;
    if(!max_price){
        max_price=Infinity;
    }
    const price_sort=req.body.price_sort;
    const rating_sort=req.body.rating_sort;

    const veg_queries=[];
    for(var i=0;i<req.body.vegs.length;i++){
        veg_queries.push({type:req.body.vegs[i]})
    }

    foods.find({$and:[{$or:shop_queries},{$or:tags_queries},{$or:veg_queries},{price:{$lte:max_price}},{price:{$gte:min_price}}]}).sort({price:price_sort,rating:rating_sort}).then(result=>{
        res.status(200).send(result)

    })
    .catch(err=>{
        console.log(err);
        res.status(404).send("error")
    })

    
})

module.exports = router;
