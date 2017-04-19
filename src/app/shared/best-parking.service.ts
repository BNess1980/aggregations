import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { bestParkingAPI } from '../../../server/routes/BestParkingDB';
import 'rxjs/add/operator/map';

@Injectable()
export class BestParkingService {

  constructor(private _bestParkingAPI: bestParkingAPI, public http: Http) {}

  public hostDev = this._bestParkingAPI.hostDev;

  getTimeStamp() {
  	return this._bestParkingAPI.timestamp;
  }

  getReservations(barcode) {	

  	let data = this._bestParkingAPI.createParams('barcode',barcode);
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


  getFacilities() {	

  	let data = this._bestParkingAPI.createParams();
  	let digest = this._bestParkingAPI.createDigest(data);
  	let url = this.hostDev + this._bestParkingAPI.queryFacility;

   	const params = new URLSearchParams();
    params.set('username', this._bestParkingAPI.user);
    params.set('digest', digest);   	    
    params.set('timestamp', this._bestParkingAPI.timestamp);

    console.log('params = '+params);

    let req = new RequestOptions({search:params});
    
    return this.http.get(url,req).map((res: Response) => res.json());

  }

  updateReservations(reservation_id) {
    let url = this.hostDev + this._bestParkingAPI.updateReservationUrl+reservation_id+'.json?';
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});       
    let req = {
      "redeemed":true
    }
    let bodyStr = JSON.stringify(req);
    return this.http.post(url, bodyStr, options).map((res: Response) => res.json());       
  }


}
