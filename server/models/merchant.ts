const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchantSchema = new Schema({
	merchantID: String,
	name: String,
	street_address: String,
	city: String,
	zip: String,
	phone: String
});

module.exports = mongoose.model('Merchant', merchantSchema);