//const sprintf = require('sprintf-js').sprintf;
const SHA256 = require('crypto-js/sha256'); // Conversion to sha256
const conv =  require('binstring'); // Conversion to binary utf-8, hexidecimal

export class bestParkingAPI {

	public hostDev:string = 'http://intg.bestparking.com';
	public hostProd = 'http://bestparking.com';

	public username:string = 'edison_api_user';
	private d = new Date();
	public date = this.d.getFullYear()+'-'+(this.d.getMonth() + 1)+'-'+this.d.getDate();
	public timestamp:string = this.d.toISOString();

	public data:string;
	public value:string; // Used for either barcode or facility
	public digest:string;

	private secretKey = conv('26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0', {out:'utf8'});


	public createDigest = (data) => {
		let hm = SHA256(this.secretKey, data);
		this.digest = conv(hm,{out:'hex'});
		console.log('This is the digest '+this.digest);
		return this.digest;
	}

	public createParams = (type?:string,value?:string) => {
		if(type === 'barcode') { // Query by barcode
			let barcode = value;
			return this.data = conv("{ ${barcode} | ${timestamp} } | { ${username} }", {out:'utf8'}); // value = barcode
		} else if(type === 'facility') { // Query by facility #
			let facility = value;
			return this.data = conv("{ ${date} | ${facility} | ${timestamp} } | { ${username} }", {out:'utf8'}); // value = facility				
		} else { // For Querying all facilities using Best Parking
			this.data = conv("{ ${timestamp} } | { ${username} }", {out:'utf8'})
			console.log('utf8 = '+this.data);
			return this.data;
		}
	};

	// query your facility  
	public queryFacility:string = '/reservations/api/v1/facilities.json?';

	// query reservation by facility
	public reservationByFacility:string = '/reservations/api/v1/reservations.json?';


}
