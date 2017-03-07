"use strict";
var mongooseImports_1 = require('./mongooseImports');
// password encyrption
var passport = require('passport');
var passwordHash = require('password-hash');
// used for mongoose/mongo api in serer code server/routes/api.ts
var merchantSchema = new mongooseImports_1.mongoose.Schema({
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
merchantSchema.methods.generateHash = function (password) {
    return passwordHash.generate(password);
};
// Check if password is valid
merchantSchema.methods.verifyPassword = function (password) {
    return passwordHash.verify(password, this.local.password);
};
module.exports = mongooseImports_1.mongoose.model('Merchant', merchantSchema, 'merchants');
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/merchant.js.map