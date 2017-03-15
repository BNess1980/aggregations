import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { merchantClient } from '../../../server/models/merchant';
import { Subscription } from 'rxjs/Rx';
import { Ticket } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../app.component.css']
})
export class ProfileComponent implements OnInit {

  private subscribe:any;
  private id:string;
  public profile:any = [];
  public ticket: Ticket;

  constructor(private _profileService:ProfileService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this.ticket = {
      ticketNo: ''
    };

    this.subscribe = this._route.params.subscribe(params => {
       this.id = params['id'];
       console.log('Coming from login.service: '+this.id);
       this._profileService.getLoggedMerchant(this.id).subscribe(profile => {
       	this.profile = profile; 
       });
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getRate(model: Ticket, isValid: boolean) {
    console.log(model);
  }
}