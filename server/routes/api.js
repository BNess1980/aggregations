var express = require('express');
var router = express.Router();
var mock = require('../../mock/users');
var Merchant = require('../models/merchant');
var Coupon = require('../models/coupon');
var mongoose = require('mongoose');
var uriDB = 'mongodb://localhost:27017/users';
// For uploading avatar images
var multer = require('multer');
var upload = multer({ dest: '../src/uploads' });
mongoose.connect(uriDB, function (err) {
    if (err)
        throw err;
    console.log("Successfully connected to database " + uriDB);
}); // connect to local db
router.use(function (req, res, next) {
    console.log('CRUD operation is occuring');
    next();
});
/*GET api listening*/
router.get('/', function (req, res) {
    res.send('api works');
});
/*Sample data coming straight from json file*/
router.get('/mock', function (req, res) {
    res.send(mock);
});
router.route('/register')
    .post(function (req, res, next) {
    var merchant = new Merchant(); // create a new instance of the merchant model
    //merchant._id = req.body._id;
    console.log(req.body.account);
    merchant.account = req.body.account; // set the merchants name (comes from the request)
    merchant.account = req.body.username;
    merchant.password = req.body.password;
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
// On routes the end with /coupons
router.route('/coupons')
    .get(function (req, res) {
    Coupon.find(function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});
router.route('/coupons/:_id')
    .get(function (req, res) {
    Coupon.findById(req.params._id, function (err, data) {
        if (err)
            res.send(err);
        console.log(data);
        res.json(data);
    });
})
    .put(function (req, res) {
    Coupon.findById(req.params._id, function (err, data) {
        if (err)
            res.send(err);
        Coupon._id = req.body._id;
        Coupon.name = req.body.name; // set the merchants name (comes from the request)
        Coupon.merchant = req.body.merchant;
        Coupon.merchantID = req.body.merchantID;
        Coupon.qty = req.body.qty;
        Coupon.amt = req.body.amt;
        Coupon.save(function () {
            if (err)
                res.send(err);
            res.json({ message: 'Coupon successfully updated!' });
        });
    });
})
    .delete(function (req, res) {
    Coupon.remove({
        _id: req.params._id
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Coupon successfully deleted!' });
    });
});
/*Sample data coming straight from json file*/
router.get('/register', function (req, res, next) {
    res.render('register');
});
module.exports = router;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/api.js.map