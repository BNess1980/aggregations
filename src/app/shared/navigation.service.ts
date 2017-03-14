import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class NavigationService {

  private loggedInSource = new Subject<string>();

  loggedInConfirmed$ = this.loggedInSource.asObservable(); 

  setAccountName(account: string) {
  	console.log('Account set as '+account);
    this.loggedInSource.next(account);
  }

}
