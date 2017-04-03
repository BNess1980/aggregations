const moment = require('moment');
const fnv = require('fnv-plus');

export class parkWhizAPI {

	public api:string = 'http://api.parkwhiz.com/';
	public reservationsURI:string = 'seller/reservations/';

	public publicKey:string = fnv.hash('503dcf3ab915d108393665167b54c7ab');
	public secretKey:string = fnv.hash('64f7ef4a13f07a42779a7d146e89c836');

}