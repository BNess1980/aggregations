import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// RXJS methods to map data to json or catch/throw error 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { merchantClient } from '../../server/models/merchant';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  createNewMerchant(body: Object): Observable<merchantClient[]>{
  	let bodyString = JSON.stringify;
  	let headers = new Headers({ 'Content-Type': 'application/json' });
  	let otpions = new RequestOptions({ headers: headers });
  	return this.http.post('/api/register/', body, headers)
  		.map((res: Response) => res.json())
  		.catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

}
