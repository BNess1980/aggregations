import {mongoose} from './mongooseImports';

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
	phone: String,
	contact_name: String,
	contact_email: String	
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
	phone: String,
	contact_name: String,
	contact_email: String,
});

module.exports = mongoose.model('Merchant',merchantSchema,'merchants');