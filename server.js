var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
// constants for login module
var session = require('express-session');
var passport = require('passport');
var api = require('./server/routes/api');
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
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
/*Get port environment and store in Express**/
var port = process.env.PORT || '3100';
app.set('port', port);
/**Create HTTP server**/
var server = http.createServer(app);
/*Listen on provided port, on all network interfaces*/
server.listen(port, function () { return console.log("API running on localhost:" + port); });
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server.js.map