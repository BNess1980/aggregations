export namespace bestAprkingAPI {

	let hostDev = 'intg.bestparking.com';
	let hostProd = 'bestparking.com';
	let username = 'edison_api_user';

	let d = new Date();
	let date = d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate();
	let timestamp = d.toISOString();

	const secretKey = '26fb6b29fcf3db80c346de793bb9e1741d0514c1086d92814780807a6ef4bcf0';

	// Use in GET requests

	export const queryFacility = 'http://${hostDev}/reservations/api/v1/facilities.json?username=${username}&digest=${secretKey}&timestamp=${timestamp}';

	// requires facility number at the end of uri
	export const reservationByFacility = 'http://${hostDev}/reservations/api/v1/reservations.json?username=${username}&date=${date}&digest=${secretKey}&facility=';

	// After adding barcode these varriables are needed to complete uri
	// &username=${username}&digest=${secretKey}&timestamp=${timestamp}
	export const reservationByBarcode = 'http://${hostDev}/reservations/api/v1/reservations.json?barcode=';

}