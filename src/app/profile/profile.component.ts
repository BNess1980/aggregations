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
  private rate:string;  
  public amount: any [];    
  private ticket: Ticket;
  public barcode:string;
  private merchantNo: string;

  constructor(private _profileService:ProfileService, private _ticketService:TicketService, private _route: ActivatedRoute) {
  }

  ngOnInit() {

    this.ticket = {
      ticketNo: '',
      ticketAmt: ''
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
      this.rate = this.rateStr._body;
      console.log(typeof(this.rate) +' '+ this.rate);

      let regPrice =  /^\d+\.\d{1,2}$/;

      //let testPrice = '10.00';

      //console.log(regPrice.test(testPrice));

      let arr = this.rate.split(" ");
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].match(regPrice)) {
          console.log(arr[i]);
        }
      }
/*

      let arr = [];
      arr.push(this.rateArr);



      let test = '18.00';
      console.log(test.match(regPrice));

      for(let i = 0; i < arr.length; i++) {
        if(arr[i].match(regPrice)) {
          console.log(arr[i])
        }
      }
*/

      //let arr = [];
      //arr.push(this.rateArr);
      //return this.amount;
    });
  }

  validateTicket(model: Ticket, isValid: boolean) {
    console.log(model);
  } 
}