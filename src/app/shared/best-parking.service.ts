import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { bestParkingAPI } from '../../../server/routes/BestParkingDB';
import 'rxjs/add/operator/map';

@Injectable()
export class BestParkingService {

  constructor(private _bestParkingAPI: bestParkingAPI, public http: Http) {}

  getFacilities() {

  	let data = this._bestParkingAPI.createParams();
  	let digest = this._bestParkingAPI.createDigest(data);
  	let bestParkingURL = this._bestParkingAPI.hostDev + this._bestParkingAPI.queryFacility;

   	const params = new URLSearchParams();
    params.set('digest', digest);   	
    params.set('username', this._bestParkingAPI.username);
    params.set('timestamp', this._bestParkingAPI.timestamp);

    console.log('params = '+params);

    let req = new RequestOptions({search:params});
    
    return this.http.get(bestParkingURL,req).map((res: Response) => res.json());

  }

}
