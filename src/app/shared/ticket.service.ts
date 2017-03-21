import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { secomDB } from '../../../server/routes/secomDB';

import { merchantClient } from '../../../server/models/merchant';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class TicketService {

  constructor(private http: Http) {}

  getTicketRate(ticketNo, merchantNo) {

  	let rateJSON = {
  		"request":"calculate rate on ticket (barcode)",
  		"inputs":{
  			"barcode":ticketNo,
  			"merchant number":merchantNo
  		}
  	}

  	let bodyStr = JSON.stringify(rateJSON);

  	// Request for rate
    console.log('Request rate '+bodyStr);

    let headers = new Headers();
    headers.append('Content-Type','text/plain');
    return this.http.post(secomDB, bodyStr, headers).map((res: Response) => JSON.stringify(res));
  }

  applyPayment(ticketNo, merchantNo, paymentAmt) {

    let paymentJSON = {
      "request":"apply payment to ticket (barcode)",
      "inputs":{
        "barcode":ticketNo,
        "merchant number":merchantNo,
        "dollar amount": paymentAmt
      }      
    }

    // Request to apply payment
    let bodyStr = JSON.stringify(paymentJSON);

    // Request for rate
    console.log('Request payment '+bodyStr);    

    let headers = new Headers();
    headers.append('Content-Type','text/plain');
    return this.http.post(secomDB, bodyStr, headers).map((res: Response) => JSON.stringify(res));    
  }

  updateAccountTickets(id:string, barcode:string, rate:string, validation:string) {
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    let req = {
       "barcode": barcode,
       "rate": rate,
       "validation":validation
    }
    let bodyStr = JSON.stringify(req);
    return this.http.put('/api/profile/'+id, bodyStr, options).map((res: Response) => res.json());   
  }

}