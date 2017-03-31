"use strict";
//const sprintf = require('sprintf-js').sprintf;
var CryptoJS = require('crypto-js'); // Conversion to sha256
var conv = require('binstring'); // Conversion to binary utf-8, hexidecimal
var moment = require('moment');
var bestParkingAPI = (function () {
    function bestParkingAPI() {
        this.hostDev = 'http://intg.bestparking.com';
        this.hostProd = 'http://bestparking.com';
        // query your facility  
        this.queryFacility = '/reservations/api/v1/facilities.json?';
        // query reservation by facility
        this.reservationByFacility = '/reservations/api/v1/reservations.json?';
        // api 	
        this.username = 'edison_api_user';
        this.user = this.username;
        this.secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0', { out: 'utf8' });
        this.currDate = new Date();
        this.date = moment(this.currDate).format('YYYY-MM-DD');
        this.timestamp = this.date + 'T' + this.addZero(this.currDate.getHours()) + ':' + this.addZero(this.currDate.getMinutes()) + ':' + this.addZero(this.currDate.getSeconds());
    }
    bestParkingAPI.prototype.addZero = function (i) {
        i < 10 ? i = "0" + i : i = i;
        return i;
    };
    bestParkingAPI.prototype.createDigest = function (data) {
        console.log(data);
        console.log(this.secretKey);
        var hashmac = CryptoJS.HmacSHA256(data, this.secretKey);
        return this.digest = CryptoJS.enc.Hex.stringify(hashmac);
    };
    bestParkingAPI.prototype.createParams = function (type, value) {
        var timestamp = this.timestamp;
        var username = this.username;
        var date = this.date;
        switch (type) {
            case 'barcode':
                var barcode = value;
                return this.data = conv(barcode + "|" + timestamp + "|" + username, { out: 'utf8' }); // value = barcode
            case 'facility':
                var facility = value;
                return this.data = conv(date + "|" + facility + "|" + timestamp + "|" + username, { out: 'utf8' }); // value = facility      
            default:
                this.data = conv(timestamp + "|" + username, { out: 'utf8' });
                return this.data;
        }
    };
    return bestParkingAPI;
}());
exports.bestParkingAPI = bestParkingAPI;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/BestParkingDB.js.map