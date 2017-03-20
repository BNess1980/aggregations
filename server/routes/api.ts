const express = require('express')
const router = express.Router();
const mock = require('../../mock/users');
const Merchant = require('../models/merchant');
const mongoose = require('mongoose');

import { secomDB } from './secomDB';
import { localMongoDB } from './mongoDB';

console.log('Database uri\'s are '+localMongoDB+' and '+secomDB);

// PassportJS
const passport = require('passport');

// Hash password on registration
const passwordHash = require('password-hash');

// Mongoose/Mongo database connection
mongoose.connect(localMongoDB, function(err) {
	if(err)
		throw err
	console.log(`Successfully connected to database ${localMongoDB}`);		
}); // connect to local db


/*************** Server Routes ****************/
/*GET api listening*/
router.get('/', (req,res) => {
	res.send('api works');
});

// Login routes
router.route('/login')
    .post(function(req,res,next) {
         passport.authenticate('local-login', function(err, user, info) {
            if (err) {
            return next(err); 
          }
          if (user === false) {
            res.status(401).send('Server Error in login');  
          } else {
            res.json(user);  
          }
      })(req,res,next);
    });    

// Register route
router.route('/register')
    // POST create a new merchant
    .post(function(req,res,next) {

        let plainPassword = req.body.password;
        let hashedPassword = passwordHash.generate(plainPassword);

        const merchant = new Merchant();      // create a new instance of the merchant model
        //merchant._id = req.body._id;
        console.log(req.body.account);
        merchant.account = req.body.account;  // set the merchants name (comes from the request)
        merchant.account = req.body.username;
        merchant.password = hashedPassword;       
        merchant.street_address = req.body.street_address;
        merchant.city = req.body.city;
        merchant.zip = req.body.zip;
        merchant.state = req.body.state;        
        merchant.phone = req.body.phone;
        merchant.contact_name =  req.body.contact_name;
        merchant.contact_email =  req.body.contact_email;        
        // save the merchant and check for errors
        merchant.save(function(err) {
            if(err)
                res.send(err);

             res.json({ message: 'New Merchant created!' });
        });

        res.location('/');
        res.redirect('/');

    });        


// On routes the end with /merchants
router.route('/merchants')
	
   	// GET all merchants
    .get(function(req,res) {
    	Merchant.find(function(err, data) {
        	if(err)
        		res.send(err);
        	res.json(data);
        });
    });

router.route('/merchants/:_id')

   	// GET merchant with mongo id that matches param :_id
    .get(function(req,res) {
    	Merchant.findById(req.params._id, function(err, data) {
        	if(err)
        		res.send(err);
        	res.json(data);
        });
    })

    // Update merchant with
    .put(function(req,res) {

    	Merchant.findById(req.params._id, function(err, data) {
        	if(err)
        		res.send(err);
        	
	        //Merchant._id = req.body._id;
	        Merchant.name = req.body.account;  // set the merchants name (comes from the request)
            Merchant.name = req.body.username;
            Merchant.password = req.body.password;                        
	        Merchant.street_address = req.body.street_address;
            Merchant.city = req.body.city;
            Merchant.zip = req.body.zip;
            Merchant.state = req.body.state;        
            Merchant.phone = req.body.phone;
            Merchant.contact_name =  req.body.contact_name;
            Merchant.contact_email =  req.body.contact_email;  

	        Merchant.save(function() {
	        	if(err)
	        		res.send(err);

	        	res.json({ message: 'Merchant successfully updated!'});
	        });


        });

    })

    .delete(function(req, res) {
    	Merchant.remove({
    		_id:req.params._id
    	}, function (err, data) {
    		if(err)
    			res.send(err);
    		res.json({ message: 'Merchant successfully deleted!'});
    	})
    });

router.route('/profile/:_id')
    .put(function(req, res) {

        Merchant.findById(req.params._id, function(err, data) {
            if(err)
                res.send(err);
            
            Merchant.tickets.barcode = req.params.barcode;
            Merchant.tickets.rate = req.params.rate;
            Merchant.tickets.validation = req.params.validation;  // set the merchants name (comes from the request

            Merchant.save(function() {
                if(err)
                    res.send('Error in updating tickets for account'+err);

                res.json({ message: 'Merchant successfully updated!'});
            });


        });

    })

    .get(function(req,res) {
        Merchant.findById(req.params._id, function(err, data) {
            if(err)
                res.send(err);
            res.json(data);
        });
    });   

module.exports = router;