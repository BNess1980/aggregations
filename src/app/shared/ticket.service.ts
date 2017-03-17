import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import { secomDB } from '../../../server/routes/secomDB';

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
    console.log(bodyStr);
    
    /*
    return Observable.fromPromise(new Promise((resolve, reject) => {
        let formData: any = new FormData()
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", secomDB, true);
        xhr.setRequestHeader('Content-Type','text/html')
        xhr.send(formData);
    }));
	*/

    let headers = new Headers();
    headers.append('Content-Type','text/plain');
   	//headers.append('Access-Control-Allow-Origin','*');
    //headers.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS'); 
    //headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return this.http.post(secomDB, bodyStr, headers).map((res: Response) => JSON.stringify(res));
  }

}
