const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: String,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
