import {mongoose} from './mongooseImports';

// password encyrption
const passport = require('passport');
const passwordHash = require('password-hash');

// used for Observable in client code /src/register.service.ts
// *Has to match schema below*
export interface merchantClient {
	_id: String,
	account: String,
	username: String,
	password: String,				
	street_address: String,
	city: String,
	state: String,
	zip: String,
	merchant_number: String,
	phone: String,
	contact_name: String,
	contact_email: String	
}

// used for mongoose/mongo api in serer code server/routes/api.ts
const merchantSchema = new mongoose.Schema({

	local: {
		username: String,
		password: String	
	},

	_id: String,
	account: String,
	username: String,
	password: String,		
	street_address: String,
	city: String,
	state: String,
	zip: String,
	merchant_number: String,	
	phone: String,
	contact_name: String,
	contact_email: String,
});

//Generate hashed password
merchantSchema.methods.generateHash = function(password) {
	return passwordHash.generate(password);
}

// Check if password is valid
merchantSchema.methods.verifyPassword = function(password) {
	return passwordHash.verify(password, this.local.password);
}

module.exports = mongoose.model('Merchant',merchantSchema,'merchants');