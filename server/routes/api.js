"use strict";
var express = require('express');
var router = express.Router();
var mock = require('../../mock/users');
var Merchant = require('../models/merchant');
var mongoose = require('mongoose');
var secomDB_1 = require('./secomDB');
var mongoDB_1 = require('./mongoDB');
console.log('Database uri\'s are ' + mongoDB_1.localMongoDB + ' and ' + secomDB_1.secomDB);
// PassportJS
var passport = require('passport');
// Hash password on registration
var passwordHash = require('password-hash');
// Mongoose/Mongo database connection
mongoose.connect(mongoDB_1.localMongoDB, function (err) {
    if (err)
        throw err;
    console.log("Successfully connected to database " + mongoDB_1.localMongoDB);
}); // connect to local db
/*************** Server Routes ****************/
/*GET api listening*/
router.get('/', function (req, res) {
    res.send('api works');
});
// Login routes
router.route('/login')
    .post(function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user === false) {
            res.status(401).send('Server Error in login');
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
    merchant.account = req.body.username;
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
        Merchant.name = req.body.account; // set the merchants name (comes from the request)
        Merchant.name = req.body.username;
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
    var query = { "_id": req.params._id };
    var update = {
        tickets: {
            barcode: req.body.barcode,
            rate: req.body.rate,
            validation: req.body.validation
        }
    };
    var options = { new: true };
    Merchant.findOneAndUpdate(query, update, options, function (err, merchant) {
        if (err)
            res.send('Error in saving Merchant ' + err);
        res.json(merchant);
        console.log('SUCCEEDED:\n' + merchant);
    });
    /*
    Merchant.findById(req.params._id, function (err, merchant) {
          console.log(req.params._id+'/n'+req.body.barcode);
          
          let myMerchant = merchant[0];

          myMerchant.tickets.push({ barcode: req.body.barcode, rate: req.body.rate, validation: req.body.validation });
          myMerchant.save(function() {
                if(err)
                    res.send('Error in saving Merchant '+err);
                    res.json({ message: 'Merchant successfully updated!'});
          });
    });
    */
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