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
var flash = require('connect-flash');
app.use(flash());
var cors = require('cors');
var whitelist = ['http://localhost:3100'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        console.log('Header = ' + req.header('Origin'));
        corsOptions = {
            origin: '*'
        }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        console.log('Header = ' + req.header('Origin'));
        corsOptions = {
            origin: false,
            methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
            credentials: false,
            allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Authorization']
        }; // reflect (enable) the requested origin in the CORS response    
    }
    callback(null, corsOptions); // callback expects two parameters: error and options 
};
app.put('*', cors(corsOptionsDelegate), function (req, res, next) {
    console.log('Hitting put route');
    next();
});
app.post('*', cors(corsOptionsDelegate), function (req, res, next) {
    console.log('Hitting post route');
    next();
});
// Parsers for POST data
app.use(bodyParser.json());
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
// Handle sessions
app.use(session({
    secret: 'edisonllc',
    saveUninitialized: true,
    resave: true
}));
// PassportJS
app.use(passport.initialize());
app.use(passport.session());
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