import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
// RXJS methods to map data to json or catch/throw error 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { merchantClient } from '../../../server/models/merchant';
import { Observable } from 'rxjs/Rx';

import { Router } from '@angular/router';


@Injectable()
export class LoginService {

  constructor(private http: Http, private _router:Router) { }

  login(body: Object): Observable<merchantClient[]>{
  	let bodyStr = JSON.stringify(body);
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
    return this.http.post('/api/login', bodyStr, <RequestOptionsArgs> {headers: headers, withCredentials: true})
        .map((res: Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server Error occured'));
  }

  redirectToMerchant(id) {
  	this._router.navigate(['/profile',id])
  	console.log('From redirectToMerchant: '+id);
  }

}