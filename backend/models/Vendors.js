const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema


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
const itemsSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
    },
    item:{
        type:[String],
    },
    pic:{
        type:String,
    },
    rating:{
        type:Number
    },
    add_ons:{
        type:[addons]
    }
})
const VendorSchema = new Schema({
	manager_name: {
		type: String,
		required: true
	},
    shop_name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
	items: {
        type:[itemsSchema]
    },
	pic:{
		type:String,
	},
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type:String,
        required:true
    }

});

module.exports = Vendor = mongoose.model("vendors", VendorSchema);
