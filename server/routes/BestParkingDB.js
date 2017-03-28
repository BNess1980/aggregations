"use strict";
//const sprintf = require('sprintf-js').sprintf;
var CryptoJS = require('crypto-js'); // Conversion to sha256
var conv = require('binstring'); // Conversion to binary utf-8, hexidecimal
var moment = require('moment');
var bestParkingAPI = (function () {
    function bestParkingAPI() {
        var _this = this;
        this.hostDev = 'http://intg.bestparking.com';
        this.hostProd = 'http://bestparking.com';
        this.username = 'edison_api_user';
        this.currDate = new Date();
        this.date = moment(this.currDate).format('YYYY-MM-DD');
        this.timestamp = this.date + 'T' + this.addZero(this.currDate.getHours()) + ':' + this.addZero(this.currDate.getMinutes()) + ':' + this.addZero(this.currDate.getSeconds());
        this.secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0', { out: 'utf8' });
        this.createDigest = function (data) {
            console.log(data);
            console.log(_this.secretKey);
            var hashmac = CryptoJS.HmacSHA256(data, _this.secretKey);
            return _this.digest = CryptoJS.enc.Hex.stringify(hashmac);
        };
        this.createParams = function (type, value) {
            var timestamp = _this.timestamp;
            var username = _this.username;
            var date = _this.date;
            console.log(timestamp);
            if (type === 'barcode') {
                var barcode = value;
                return _this.data = conv(barcode + "|" + timestamp + "|" + username, { out: 'utf8' }); // value = barcode
            }
            else if (type === 'facility') {
                var facility = value;
                return _this.data = conv(date + "|" + facility + "|" + timestamp + "|" + username, { out: 'utf8' }); // value = facility				
            }
            else {
                _this.data = conv(timestamp + "|" + username, { out: 'utf8' });
                return _this.data;
            }
        };
        // query your facility  
        this.queryFacility = '/reservations/api/v1/facilities.json?';
        // query reservation by facility
        this.reservationByFacility = '/reservations/api/v1/reservations.json?';
    }
    bestParkingAPI.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    return bestParkingAPI;
}());
exports.bestParkingAPI = bestParkingAPI;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/BestParkingDB.js.map