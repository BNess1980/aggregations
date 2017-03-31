import {mongoose} from './mongooseImports';

// password encyrption
const passport = require('passport');
const passwordHash = require('password-hash');

// used for Observable in client code /src/register.service.ts
// *Has to match schema below*
export interface merchantClient {
	_id: string,
	account: string,
	username: string,
	password: string,				
	street_address: string,
	city: string,
	state: string,
	zip: string,
	merchant_number: string,
	validations?:{name:string,discount:string},
	tickets?:[{barcode:string,rate:string,validation:string}],
	phone: string,
	contact_name: string,
	contact_email: string	
}

// used for mongoose/mongo api in serer code server/routes/api.ts
const merchantSchema = new mongoose.Schema({
	_id: String,
	account: String,
	username: String,
	password: String,		
	street_address: String,
	city: String,
	state: String,
	zip: String,
	merchant_number: String,
	validations:{name:String,discount:String,},
	tickets:[{barcode:String,rate:String,validation:String}],	
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
	// Using temporarily for the accounts sans hashed passwords
	if(password === this.password){
		console.log('Password\'s matched');
		console.log(password+':'+this.password);
		return true;
	}
	// Use this when you redo database and add accounts with hashed password
	//return passwordHash.verify(password, this.password);
}

module.exports = mongoose.model('Merchant',merchantSchema,'merchants');