import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { TicketService } from '../shared/ticket.service';
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
  private rateStr:any = [];
  public amount:string;    
  private ticket: Ticket;
  public barcode:string;
  private merchantNo: string;

  constructor(private _profileService:ProfileService, private _ticketService:TicketService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this.ticket = {
      ticketNo: ''
    };

    this.subscribe = this._route.params.subscribe(params => {
       this.id = params['id'];
       console.log('Coming from login.service: '+this.id);
       this._profileService.getLoggedMerchant(this.id).subscribe(profile => {
       	this.profile = profile; 
        this.merchantNo = this.profile.merchant_number;
        return this.merchantNo;
       });
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getRate(model: Ticket, isValid: boolean) {
    let barcode = model.ticketNo;
    const merchantNo = this.merchantNo;
    this._ticketService.getTicketRate(barcode, merchantNo).subscribe(rate => {
      this.rateStr = JSON.parse(rate);
      console.log(this.rateStr._body);
      this.amount = this.rateStr._body.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/);
      console.log(this.amount);
    });
  }
}