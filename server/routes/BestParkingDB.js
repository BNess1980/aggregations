"use strict";
var CryptoJS = require('crypto-js'); // Conversion to sha256
var conv = require('binstring'); // Conversion to binary utf-8, hexidecimal
var moment = require('moment');
var momentTimeZone = require('moment-timezone');
var bestParkingAPI = (function () {
    function bestParkingAPI() {
        this.hostDev = 'http://intg.bestparking.com';
        this.hostProd = 'http://bestparking.com';
        // query your facility  
        this.queryFacility = '/reservations/api/v1/facilities.json?';
        // query reservation by facility
        this.reservationByFacility = '/reservations/api/v1/reservations.json?';
        this.updateReservationUrl = '/reservations/api/v1/reservations/';
        // api 	
        this.username = 'edison_api_user';
        this.user = this.username;
        this.secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0', { out: 'utf8' });
        this.currDate = new Date();
        this.date = moment(this.currDate).format('YYYY-MM-DD');
        this.timestamp = moment().format('YYYY-MM-DDTHH:mm:ss');
        this.timestampCST = momentTimeZone(this.timestamp).tz('America/Chicago').format('YYYY-MM-DDTHH:mm:ss'); // For Posting back to Best Parking
    }
    bestParkingAPI.prototype.createDigest = function (data) {
        var hashmac = CryptoJS.HmacSHA256(data, this.secretKey);
        return this.digest = CryptoJS.enc.Hex.stringify(hashmac);
    };
    bestParkingAPI.prototype.createParams = function (type, value) {
        var timestamp = this.timestamp;
        var timestampCST = this.timestampCST;
        console.log(timestamp);
        console.log(timestampCST);
        var username = this.username;
        var date = this.date;
        switch (type) {
            case 'barcode':
                var barcode = value;
                return this.data = conv(barcode + "|" + timestamp + "|" + username, { out: 'utf8' }); // value = barcode
            case 'facility':
                var facility = value;
                return this.data = conv(date + "|" + facility + "|" + timestamp + "|" + username, { out: 'utf8' }); // value = facility
            case 'redeem':
                var id = value;
                var redeemed = true;
                return this.data = conv(id + "|" + redeemed + "|" + timestampCST + "|" + username, { out: 'utf8' }); // value = reservation id	     	        
            default:
                this.data = conv(timestamp + "|" + username, { out: 'utf8' });
                return this.data;
        }
    };
    return bestParkingAPI;
}());
exports.bestParkingAPI = bestParkingAPI;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/BestParkingDB.js.map