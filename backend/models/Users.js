const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
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

module.exports = User = mongoose.model("items", UserSchema);
