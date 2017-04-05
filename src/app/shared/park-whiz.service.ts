import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { parkWhizAPI } from '../../../server/routes/ParkWhizDB';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkWhizService {

  constructor(private _parkWhizAPI: parkWhizAPI, private http: Http) { }

  getReservations(reservation:string,location_id?:string) {	

  	const reservationID = reservation;
  	let url = this._parkWhizAPI.api + this._parkWhizAPI.reservationsURI + reservationID;

   	let params = new URLSearchParams();
   	params.set('public_key', this._parkWhizAPI.publicKey);
   	params.set('secret_key', this._parkWhizAPI.secretKey);

   	if(location_id) {
    	params.set('location_id', location_id);
   	}

    console.log('params = '+params);

    let req = new RequestOptions({search:params});

    console.log(url);
    
    return this.http.get(url,req).map((res: Response) => res.json());

  }


}