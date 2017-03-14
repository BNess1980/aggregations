import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../shared/navigation.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public brandTitle:string = 'PARKFAST Validations';
  private isLogged: boolean;
  public account: string;
  subscription: Subscription;

  constructor(private _navService: NavigationService) { 
      this.subscription = _navService.loggedInConfirmed$.subscribe(account => {
        this.account = account;
      });
  }

  ngOnInit() {
    this.account !== undefined ? this.isLogged = true : this.isLogged = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}