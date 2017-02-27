import mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
	_id: String,
	name: String,
	street_address: String,
	city: String,
	zip: String,
	phone: String
});

module.exports = mongoose.model('Merchant',merchantSchema,'merchants');