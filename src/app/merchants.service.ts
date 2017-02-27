import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MerchantService {

  constructor(private http: Http) { }

  getAllMerchants() {
  	return this.http.get('/api/merchants')
  	.map(res => res.json());
  }

}
