"use strict";
var mongooseImports_1 = require('./mongooseImports');
var merchantSchema = new mongooseImports_1.mongoose.Schema({
    _id: String,
    name: String,
    street_address: String,
    city: String,
    zip: String,
    phone: String
});
module.exports = mongooseImports_1.mongoose.model('Merchant', merchantSchema, 'merchants');
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/merchant.js.map