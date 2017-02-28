const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./server/routes/api'); // Where CRUD routes exist
const app = express();

// includes for login module
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// For login messaging
const flash = require('connect-flash');
const expressValidator = require('express-validator');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Handle sessions
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Field Validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect-Flash & Express Messaging
app.use(require('connect-flash')());
app.use(function(req,res,next) {
	res.locals.messages = require('express-messages')(req,res);
	next();
});

// Catch all other routes and return the index file
app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*Get port environment and store in Express**/
const port = process.env.PORT || '3100';
app.set('port', port);

/**Create HTTP server**/
const server = http.createServer(app);

/*Listen on provided port, on all network interfaces*/
server.listen(port, () => console.log(`API running on localhost:${port}`));