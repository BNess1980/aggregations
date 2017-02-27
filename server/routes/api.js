var express = require('express');
var router = express.Router();
var mock = require('../../mock/users');
var Merchant = require('../models/merchant');
var mongoose = require('mongoose');
var merchantsDB = 'mongodb://localhost:27017/users';
//const validationsDB:string = 'mongodb://localhost:27017/validations';
mongoose.connect(merchantsDB, function (err) {
    if (err)
        throw err;
    console.log("Successfully connected to database " + merchantsDB);
}); // connect to local db
/*
mongoose.connect(validationsDB, function(err) {
    if(err)
        throw err
    console.log(`Successfully connected to database ${validationsDB}`);
}); // connect to local db
*/
router.use(function (req, res, next) {
    console.log('CRUD operation is occuring');
    next();
});
/*GET api listening*/
router.get('/', function (req, res) {
    res.send('api works');
});
router.get('/mock', function (req, res) {
    res.send(mock);
});
// On routes the end with /merchants
router.route('/merchants')
    .post(function (req, res) {
    var merchant = new Merchant(); // create a new instance of the Bear model
    merchant._id = req.body._id;
    merchant.name = req.body.name; // set the merchants name (comes from the request)
    merchant.street_address = req.body.street_address;
    merchant.city = req.body.city;
    merchant.zip = req.body.zip;
    merchant.phone = req.body.phone;
    // save the merchant and check for errors
    merchant.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'New Merchant created!' });
    });
})
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
        Merchant._id = req.body._id;
        Merchant.name = req.body.name; // set the merchants name (comes from the request)
        Merchant.street_address = req.body.street_address;
        Merchant.city = req.body.city;
        Merchant.zip = req.body.zip;
        Merchant.phone = req.body.phone;
        Merchant.save(function () {
            if (err)
                res.send(err);
            res.json({ message: 'Merchant suceessfully updated!' });
        });
    });
})
    .delete(function (req, res) {
    Merchant.remove({
        _id: req.params._id
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Merchant succesfully deleted!' });
    });
});
module.exports = router;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/api.js.map