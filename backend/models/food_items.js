const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addons=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const foodsSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    shop_name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:false
    },
    pic:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    add_ons:{
        type:[addons]
    },
    price:{
        type:Number,
        require:true
    }
})

module.exports=food_items=mongoose.model("food_items",foodsSchema);

//db.food.createIndex({'key':1},{collation:{locale:'en',strength:2}})