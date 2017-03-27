"use strict";
//const sprintf = require('sprintf-js').sprintf;
var SHA256 = require('crypto-js/sha256'); // Conversion to sha256
var conv = require('binstring'); // Conversion to binary utf-8, hexidecimal
var bestParkingAPI = (function () {
    function bestParkingAPI() {
        var _this = this;
        this.hostDev = 'http://intg.bestparking.com';
        this.hostProd = 'http://bestparking.com';
        this.username = 'edison_api_user';
        this.d = new Date();
        this.date = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate();
        this.timestamp = this.d.toISOString();
        this.secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0', { out: 'utf8' });
        this.createDigest = function (data) {
            var hm = SHA256(_this.secretKey, data);
            _this.digest = conv(hm, { out: 'hex' });
            console.log('This is the digest ' + _this.digest);
            return _this.digest;
        };
        this.createParams = function (type, value) {
            if (type === 'barcode') {
                var barcode = value;
                return _this.data = conv("{ ${barcode} | ${timestamp} } | { ${username} }", { out: 'utf8' }); // value = barcode
            }
            else if (type === 'facility') {
                var facility = value;
                return _this.data = conv("{ ${date} | ${facility} | ${timestamp} } | { ${username} }", { out: 'utf8' }); // value = facility				
            }
            else {
                return _this.data = conv("{ ${timestamp} } | { ${username} }", { out: 'utf8' });
            }
        };
        // query your facility  
        this.queryFacility = '/reservations/api/v1/facilities.json?';
        // query reservation by facility
        this.reservationByFacility = '/reservations/api/v1/reservations.json?';
    }
    return bestParkingAPI;
}());
exports.bestParkingAPI = bestParkingAPI;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/BestParkingDB.js.map