"use strict";
var express = require('express');
var router = express.Router();
var mock = require('../../mock/users');
var Merchant = require('../models/merchant');
var mongoose = require('mongoose');
var flash = require('connect-flash');
// DB uri info
var secomDB_1 = require('./secomDB');
var mongoDB_1 = require('./mongoDB');
var mongoDB_2 = require('./mongoDB');
console.log('Database uri\'s are ' + mongoDB_1.localMongoDB + ' and ' + secomDB_1.secomDB);
// PassportJS for login
var passport = require('passport');
// Hash password on registration
var passwordHash = require('password-hash');
// Needed only if conecting to mLabMongo
var conn2 = mongoose.createConnection(mongoDB_2.localMongoAggDB);
// Mongoose/Mongo database connection
mongoose.connect(mongoDB_1.localMongoDB, function (err) {
    if (err)
        throw err;
    console.log("Successfully connected to database " + mongoDB_1.localMongoDB);
}); // connect to local db
/*************** Server Routes ****************/
/*GET api listening*/
router.get('/', function (req, res) {
    res.json('api works');
});
// Login routes
router.route('/login')
    .get(function (req, res) {
    res.json({ message: req.flash('loginMessage') });
})
    .post(function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).send({ error: req.flash('loginMessage') });
        }
        else {
            res.json(user);
        }
    })(req, res, next);
});
// Register route
router.route('/register')
    .post(function (req, res, next) {
    var plainPassword = req.body.password;
    var hashedPassword = passwordHash.generate(plainPassword);
    var merchant = new Merchant(); // create a new instance of the merchant model
    //merchant._id = req.body._id;
    console.log(req.body.account);
    merchant.account = req.body.account; // set the merchants name (comes from the request)
    merchant.password = hashedPassword;
    merchant.street_address = req.body.street_address;
    merchant.city = req.body.city;
    merchant.zip = req.body.zip;
    merchant.state = req.body.state;
    merchant.phone = req.body.phone;
    merchant.contact_name = req.body.contact_name;
    merchant.contact_email = req.body.contact_email;
    // save the merchant and check for errors
    merchant.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'New Merchant created!' });
    });
    res.location('/');
    res.redirect('/');
});
// On routes the end with /merchants
router.route('/merchants')
    .get(function (req, res) {
    Merchant.find(function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});
router.route('/merchants/:_id')
    .get(function (req, res) {
    Merchant.findById(req.params._id, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
})
    .put(function (req, res) {
    Merchant.findById(req.params._id, function (err, data) {
        if (err)
            res.send(err);
        //Merchant._id = req.body._id;
        Merchant.account = req.body.account; // set the merchants name (comes from the request)
        Merchant.password = req.body.password;
        Merchant.street_address = req.body.street_address;
        Merchant.city = req.body.city;
        Merchant.zip = req.body.zip;
        Merchant.state = req.body.state;
        Merchant.phone = req.body.phone;
        Merchant.contact_name = req.body.contact_name;
        Merchant.contact_email = req.body.contact_email;
        Merchant.save(function () {
            if (err)
                res.send(err);
            res.json({ message: 'Merchant successfully updated!' });
        });
    });
})
    .delete(function (req, res) {
    Merchant.remove({
        _id: req.params._id
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Merchant successfully deleted!' });
    });
});
router.route('/profile/:_id')
    .put(function (req, res) {
    var ticket = {
        barcode: req.body.barcode,
        rate: req.body.rate,
        validation: req.body.validation
    };
    Merchant.findOneAndUpdate({ _id: req.params._id }, { $push: { tickets: ticket } }, { safe: true, upsert: true, new: true }, function (err, merchant) {
        if (err)
            res.send('Error: Possible Duplicate Value' + err);
        res.json(merchant);
        console.log('SUCCEEDED:\n' + merchant);
    });
})
    .get(function (req, res) {
    Merchant.findById(req.params._id, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});
module.exports = router;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/api.js.map