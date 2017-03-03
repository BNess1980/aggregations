"use strict";
var mongooseImports_1 = require('./mongooseImports');
// used for mongoose/mongo api in serer code server/routes/api.ts
var merchantSchema = new mongooseImports_1.mongoose.Schema({
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
module.exports = mongooseImports_1.mongoose.model('Merchant', merchantSchema, 'merchants');
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/merchant.js.map