import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { TicketService } from '../shared/ticket.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { merchantClient } from '../../../server/models/merchant';
import { Subscription } from 'rxjs/Rx';
import { Ticket } from './profile.interface';

// Save record for mongo
//const mongoose = require('mongoose');
//import { localMongoDB } from '../../../server/routes/mongoDB';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../app.component.css']
})
export class ProfileComponent implements OnInit {

  // Ticket and Merchant variables
  private subscribe:any;
  private id:string;
  private ticket: Ticket; // from Ticket interface
  public barcode:String;
  private merchantNo: string; 
  public profile:any = [];
  public validation: String;
  
  // Variables for getting payment
  private rateStr:any = [];
  private rate:string;  
  public amount:string;

  // Variables for applying payment    
  private paymentResp:any = [];
  public paymentSuccess:boolean = false;
  public merchantUpdated:any = [];

  constructor(private _profileService:ProfileService, private _ticketService:TicketService, private _route: ActivatedRoute) {
  }

  ngOnInit() {

    this.ticket = {
      ticketValidation: '',
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

  clearTicket() {
    this.paymentSuccess = false;
    this.amount = '';
    this.ngOnDestroy();
  }

  getRate(model: Ticket, isValid: boolean) {

    console.log(model);

    this.barcode = model.ticketNo;
    this.validation = model.ticketValidation;

    const merchantNo = this.merchantNo;

    this._ticketService.getTicketRate(this.barcode, merchantNo).subscribe(rate => {
      this.rateStr = JSON.parse(rate);
      console.log(this.rateStr);
      this.rate = this.rateStr._body;
      console.log(typeof(this.rate) +' '+ this.rate);

      let regPrice =  /^\d+\.\d{1,2}$/;
      let arr = this.rate.split(" ");

      for(let i = 0; i < arr.length; i++) {
        if(arr[i].match(regPrice)) {
          console.log(arr[i])
          return this.amount = arr[i];
        }
      }
     
    });
  }


  validateTicket() {
      this.updateMerchant(this.id, this.barcode, this.amount, this.validation);
      /*
      const paymentAmt:number = parseInt(this.amount) * 100;

      console.log('vars:'+'\n'+this.barcode+'\n'+this.merchantNo+'\n'+paymentAmt);

      this._ticketService.applyPayment(this.barcode, this.merchantNo, paymentAmt).subscribe(rate => {
        this.paymentResp = JSON.parse(rate);
        console.log(this.paymentResp);
        this.paymentResp.statusText = 'OK' ? this.paymentSuccess = true : this.paymentSuccess = false;
            if(this.paymentSuccess === true) {
              console.log(this.paymentSuccess);
              this.updateMerchant(this.id, this.barcode, this.amount, this.validation);
            }
            return this.paymentSuccess;
      });
      */
  }

  updateMerchant(_id, barcode, rate, validation) {
    this._ticketService.updateAccountTickets(_id, barcode, rate, validation).subscribe(updated => {
      this.merchantUpdated = updated;
    });    
  }


} // end ProfileComponent class