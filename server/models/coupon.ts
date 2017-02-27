import {mongooseWithDBL} from './mongooseImports';

let SchemaTypes = mongooseWithDBL.Schema.Types;

const couponSchema = new mongooseWithDBL.Schema({
	_id: String,
	name: String,
	merchant: String,
	merchantID: String,
	qty: Number,
	amt: SchemaTypes.Double
});

module.exports = mongooseWithDBL.model('Coupon',couponSchema,'validations');