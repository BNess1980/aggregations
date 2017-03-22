"use strict";
var bestAprkingAPI;
(function (bestAprkingAPI) {
    var hostDev = 'intg.bestparking.com';
    var hostProd = 'bestparking.com';
    var username = 'edison_api_user';
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    var timestamp = d.toISOString();
    var secretKey = '26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0';
    // Use in GET requests
    bestAprkingAPI.queryFacility = 'http://${hostDev}/reservations/api/v1/facilities.json?username=${username}&digest=${secretKey}&timestamp=${timestamp}';
    // requires facility number at the end of uri
    bestAprkingAPI.reservationByFacility = 'http://${hostDev}/reservations/api/v1/reservations.json?username=${username}&date=${date}&digest=${secretKey}&facility=';
    // After adding barcode these varriables are needed to complete uri
    // &username=${username}&digest=${secretKey}&timestamp=${timestamp}
    bestAprkingAPI.reservationByBarcode = 'http://${hostDev}/reservations/api/v1/reservations.json?barcode=';
})(bestAprkingAPI = exports.bestAprkingAPI || (exports.bestAprkingAPI = {}));
//# sourceMappingURL=C:/Users/brucen/Personal/aggregations/server/routes/BestParkingDB.js.map