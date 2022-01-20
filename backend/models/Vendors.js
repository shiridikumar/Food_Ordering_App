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
        type:String,
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
    shop_nme:{
        type:String,
        required:true
    },
    pssword:{
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
	type:{
		type: String,
		required: true
	},
	item:{
		type:String,
		required:false
	},
	pic:{
		type:String,
		required:false
	}
});

module.exports = Vendor = mongoose.model("vendors", VendorSchema);
