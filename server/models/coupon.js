var mongooseWithDBL = require('mongoose');
require('mongoose-double')(mongooseWithDBL);
var SchemaTypes = mongooseWithDBL.Schema.Types;
var couponSchema = new mongooseWithDBL.Schema({
    _id: String,
    name: String,
    merchant: String,
    merchantID: String,
    qty: Number,
    amt: SchemaTypes.Double
});
module.exports = mongooseWithDBL.model('Coupon', couponSchema, 'validations');
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/coupon.js.map