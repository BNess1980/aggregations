// Congifuration for passportjs

// Use the local strategy for passport
const LocalStrategy = require('passport-local').Strategy;
//load the Merchant model
const merchantSchema = require('../server/models/merchant');
// PassportJS
const passport = require('passport');
// expose this function to our app using module.exports

const flash = require('connect-flash');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize Merchants out of session

    // used to serialize the Merchant for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the Merchant
    passport.deserializeUser(function(_id, done) {
        merchantSchema.findById(_id, function(err, user) {
            done(err, user);
        });
    });

     // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses merchant name and password, we will override with username
        username : 'username',
        password : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // find a Merchant whose username is the same as the form's username
        // we are checking to see if the Merchant trying to login already exists
        merchantSchema.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a Merchant with that email
            if (user) {
                return done(null, false, console.log('That email is already taken.'));
            } else {

                // if there is no Merchant with that email
                // create the Merchant
                var newMerchant = new merchantSchema();

                // set the Merchant's local credentials
                newMerchant.username = username;
                newMerchant.password = newMerchant.generateHash(password); // use the generateHash function in our Merchant model

                // save the Merchant
                newMerchant.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newMerchant);
                });
            }

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses merchant name and password, we will override with email
        username : 'username',
        password : 'password',
        passReqToCallback : true, // allows us to pass back the entire request to the callback
        failureFlash: true
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a Merchant whose email is the same as the forms email
        // we are checking to see if the Merchant trying to login already exists
        merchantSchema.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no Merchant is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage','Username not found!')); // req.flash is the way to set flashdata using connect-flash
            // if the Merchant is found but the password is wrong
            if (!user.verifyPassword(password))
                return done(null, false, req.flash('loginMessage','Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful Merchant
            return done(null, user, console.log(user));
        });

    }));

};