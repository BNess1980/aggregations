import { Injectable } from '@angular/core';
import { bestParkingAPI } from '../../../server/routes/BestParkingDB';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BestParkingService {

  constructor(private _bestParkingAPI: bestParkingAPI, public http: Http) {}

  getFacilities() {

  	let data:string = this._bestParkingAPI.createParams();
  	let digest:string = this._bestParkingAPI.createDigest(data);
  	let bestParkingURL:string = this._bestParkingAPI.hostDev + this._bestParkingAPI.queryFacility;

    let headers = new Headers({'Content-Type':'application/json'});

    let params = new URLSearchParams();
    params.set('username', this._bestParkingAPI.username);
    params.set('digest', digest);
    params.set('timestamp', this._bestParkingAPI.timestamp);

    let req = new RequestOptions({search:params,headers:headers})
    
    return this.http.get(bestParkingURL,req).map((res: Response) => res.json());

  }

}
