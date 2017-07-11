import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { bestParkingAPI } from '../../../server/routes/BestParkingDB';
import 'rxjs/add/operator/map';

@Injectable()
export class BestParkingService {

  constructor(private _bestParkingAPI: bestParkingAPI, public http: Http) {}

  public hostDev = this._bestParkingAPI.hostDev;
  public hostProd = this._bestParkingAPI.hostProd;


  getTimeStamp() {
  	return this._bestParkingAPI.timestamp;
  }

  getReservations(barcode) {	

  	let data = this._bestParkingAPI.createParams('barcode', barcode);
  	let digest = this._bestParkingAPI.createDigest(data);
  	let url = this.hostDev + this._bestParkingAPI.reservationByFacility;

   	const params = new URLSearchParams();
   	params.set('barcode', barcode);
    params.set('username', this._bestParkingAPI.user);
    params.set('digest', digest);   	    
    params.set('timestamp', this._bestParkingAPI.timestamp);

    console.log('params = '+params);

    let req = new RequestOptions({search:params});
    
    return this.http.get(url,req).map((res: Response) => res.json());

  }

  updateReservations(reservation_id) {

    let data = this._bestParkingAPI.createParams('redeem', reservation_id);
    let digest = this._bestParkingAPI.createDigest(data);

    console.log('XXXXX'+typeof digest);
    console.log(typeof this._bestParkingAPI.timestamp);
    console.log(typeof this._bestParkingAPI.user);

    let params = new URLSearchParams(); 
    params.append('digest', digest);         
    params.append('redeemed', 'true'); 
    params.append('timestamp', this._bestParkingAPI.timestamp);    
    params.append('username', this._bestParkingAPI.user);

    let url = this.hostDev + this._bestParkingAPI.updateReservationUrl+reservation_id+'.json';

    console.log(url);

    return this.http.post(url,params).map((res: Response) => res.json());       
  }


}