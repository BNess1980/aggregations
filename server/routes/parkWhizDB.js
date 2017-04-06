"use strict";
var parkWhizAPI = (function () {
    function parkWhizAPI() {
        this.api = 'http://api.sandbox.parkwhiz.com/';
        this.reservationsURI = 'seller/reservations/';
        this.publicKey = '503dcf3ab915d108393665167b54c7ab';
        this.secretKey = '64f7ef4a13f07a42779a7d146e89c836';
    }
    return parkWhizAPI;
}());
exports.parkWhizAPI = parkWhizAPI;
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/parkWhizDB.js.map