import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from '../shared/navigation.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public brandTitle:string = 'PARKFAST Validations';
  private isLogged: boolean = false;
  public account: string;
  subscribe: Subscription;

  constructor(private _navService: NavigationService) { 
      this.subscribe = _navService.loggedInConfirmed$.subscribe(account => {
        this.account = account;
        console.log(this.account);
        account !== undefined ? this.isLogged = true : this.isLogged = false;
      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}