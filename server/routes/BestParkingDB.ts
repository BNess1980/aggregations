const CryptoJS = require('crypto-js'); // Conversion to sha256
const conv =  require('binstring'); // Conversion to binary utf-8, hexidecimal
const moment = require('moment');
const momentTimeZone = require('moment-timezone');

export class bestParkingAPI {

	public hostDev:string = 'http://intg.bestparking.com';
	public hostProd:string = 'http://bestparking.com';
	// query your facility  
	public queryFacility:string = '/reservations/api/v1/facilities.json?';
	// query reservation by facility
	public reservationByFacility:string = '/reservations/api/v1/reservations.json?';

	public updateReservationUrl:string = '/reservations/api/v1/reservations/';

	// api 	
	private username:string = 'edison_api_user';
	public user:string = this.username;

	private secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0',{out:'utf8'});

	private currDate = new Date();
	public date = moment(this.currDate).format('YYYY-MM-DD');
	public timestamp = moment().format('YYYY-MM-DDTHH:mm:ss');
	public timestampCST = momentTimeZone(this.timestamp).tz('America/Chicago').format('YYYY-MM-DDTHH:mm:ss'); // For Posting back to Best Parking
	public timestampPST = momentTimeZone(this.timestamp).tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ss'); // For Posting back to Best Parking



	public data:string;
	public value:string; // Used for either barcode or facility
	public digest:string;

	public createDigest(data) {
		let hashmac = CryptoJS.HmacSHA256(data,this.secretKey);
		return this.digest = CryptoJS.enc.Hex.stringify(hashmac);
	}

	public createParams(type?:string,value?:any,bool?:boolean) {

		let timestamp = this.timestamp;
		let timestampCST = this.timestampCST;
		let timestampPST = this.timestampPST;

		console.log(timestamp); 
		console.log(timestampCST);
		let username = this.username;
		let date = this.date;

	    switch(type) {
	     case 'barcode':
	       let barcode = value;
	       return this.data = conv(`${barcode}|${timestamp}|${username}`,{out:'utf8'}); // value = barcode
	     case 'facility':
		   let facility = value;
	       return this.data = conv(`${date}|${facility}|${timestamp}|${username}`,{out:'utf8'}); // value = facility
	     case 'redeem':
	       let id = value;
	       let redeemed = bool;
	       console.log(typeof id);
	       console.log(typeof bool);
	       return this.data = conv(`${id}|${redeemed}|${timestamp}|${username}`,{out:'utf8'}); // value = reservation id	     	        
	     default:
		   this.data = conv(`${timestamp}|${username}`,{out:'utf8'});
		   return this.data;  
	    }

	}

}
