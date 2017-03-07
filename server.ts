const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// constants for login module
const session = require('express-session');
const passport = require('passport');
const api = require('./server/routes/api');

require('./config/passport')(passport); // pass passport for configuration

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Handle sessions
app.use(session({
  secret: 'edisonllc',
  saveUninitialized: true,
  resave: true
}));

// PassportJS
app.use(passport.initialize());
app.use(passport.session());

// Set our api routes
app.use('/api', api);

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