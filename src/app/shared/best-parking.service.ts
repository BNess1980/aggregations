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

  updateReservations(reservation_id,reservation_code) {

    let data = this._bestParkingAPI.createParams('redeem', reservation_id);
    let digest = this._bestParkingAPI.createDigest(data);

    console.log(data);
    console.log(typeof digest +' '+ digest);
    console.log(this._bestParkingAPI.timestamp)
    
    let params = new URLSearchParams(); 
    params.append('digest', digest);         
    params.append('redeemed', 'true'); 
    params.append('timestamp', this._bestParkingAPI.timestamp);    
    params.append('username', this._bestParkingAPI.user);

    let body = {
      "digest":digest,
      "redeemed":true,
      "timestamp":this._bestParkingAPI.timestamp,
      "username":this._bestParkingAPI.user
    }

    let bodyStr = JSON.stringify(body);
    let headers = new Headers({'content-type':'application/json'});

    let url = this.hostDev + this._bestParkingAPI.updateReservationUrl+reservation_id+'.json';
    let req = new RequestOptions({method:RequestMethod.Post,body:params});

    console.log(url);

    return this.http.request(url,req).map((res: Response) => res.json());       
  }


}