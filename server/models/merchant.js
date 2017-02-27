"use strict";
var mongoose = require('mongoose');
var merchantSchema = new mongoose.Schema({
    _id: String,
    name: String,
    street_address: String,
    city: String,
    zip: String,
    phone: String
});
module.exports = mongoose.model('Merchant', merchantSchema, 'merchants');
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/merchant.js.map