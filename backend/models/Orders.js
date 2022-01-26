const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema =new Schema({
    email:{
        type:String,
        required:true
    },
    shop_name:{
        type:String,
        required:true
    },
    food:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:-1
    },
    Time:{
        type:Date,
        required:true
    }

})

module.exports=Orders=mongoose.model("orders",ordersSchema);