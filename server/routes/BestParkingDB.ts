//const sprintf = require('sprintf-js').sprintf;
const CryptoJS = require('crypto-js'); // Conversion to sha256
const conv =  require('binstring'); // Conversion to binary utf-8, hexidecimal
const moment = require('moment');

export class bestParkingAPI {

	public hostDev:string = 'http://intg.bestparking.com';
	public hostProd = 'http://bestparking.com';
	public username:string = 'edison_api_user';

	private addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}

	private currDate = new Date();
	public date = moment(this.currDate).format('YYYY-MM-DD');
	public timestamp:any = this.date+'T'+this.addZero(this.currDate.getHours())+':'+this.addZero(this.currDate.getMinutes())+':'+this.addZero(this.currDate.getSeconds());

	public data:string;
	public value:string; // Used for either barcode or facility
	public digest:string;

	private secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0',{out:'utf8'});

	public createDigest = (data) => {
		console.log(data);
		console.log(this.secretKey);
		let hashmac = CryptoJS.HmacSHA256(data,this.secretKey);
		return this.digest = CryptoJS.enc.Hex.stringify(hashmac);
	}

	public createParams = (type?:string,value?:string) => {

		let timestamp = this.timestamp;
		let username = this.username;
		let date = this.date;

		console.log(timestamp);

		if(type === 'barcode') { // Query by barcode
			let barcode = value;
			return this.data = conv(`${barcode}|${timestamp}|${username}`,{out:'utf8'}); // value = barcode
		} else if(type === 'facility') { // Query by facility #
			let facility = value;
			return this.data = conv(`${date}|${facility}|${timestamp}|${username}`,{out:'utf8'}); // value = facility				
		} else { // For Querying all facilities using Best Parking
			this.data = conv(`${timestamp}|${username}`,{out:'utf8'});
			return this.data;
		}
	};

	// query your facility  
	public queryFacility:string = '/reservations/api/v1/facilities.json?';

	// query reservation by facility
	public reservationByFacility:string = '/reservations/api/v1/reservations.json?';


}
