"use strict";
// Standard mongoose object; For models not needing a double type for property
exports.mongoose = require('mongoose');
// For models requiring double type
exports.mongooseWithDBL = require('mongoose');
require('mongoose-double')(exports.mongooseWithDBL);
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/models/mongooseImports.js.map