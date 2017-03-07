import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { merchantClient } from '../../server/models/merchant';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MerchantService {

  constructor(private http: Http) { }

  getAllMerchants(): Observable<merchantClient[]>  {
  	return this.http.get('/api/merchants')
  	.map((res:Response) => res.json())
  	.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
