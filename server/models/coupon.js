"use strict";
var mongooseImports_1 = require('./mongooseImports');
var SchemaTypes = mongooseImports_1.mongooseWithDBL.Schema.Types;
var couponSchema = new mongooseImports_1.mongooseWithDBL.Schema({
    _id: String,
    name: String,
    merchant: String,
    merchantID: String,
    qty: Number,
    amt: SchemaTypes.Double
});
module.exports = mongooseImports_1.mongooseWithDBL.model('Coupon', couponSchema, 'validations');
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/coupon.js.map