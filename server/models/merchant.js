var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var merchantSchema = new Schema({
    merchantID: String,
    name: String,
    street_address: String,
    city: String,
    zip: String,
    phone: String
});
module.exports = mongoose.model('Merchant', merchantSchema);
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/merchant.js.map