// Standard mongoose object; For models not needing a double type for property
export const mongoose = require('mongoose');

// For models requiring double type
export const mongooseWithDBL = require('mongoose') 
require('mongoose-double')(mongooseWithDBL);