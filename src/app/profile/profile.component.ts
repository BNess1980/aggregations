import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { TicketService } from '../shared/ticket.service';
import { BestParkingService } from '../shared/best-parking.service';
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

  // Ticket and Merchant variables
  private subscribe:any;
  private id:string;
  private ticket: Ticket; // from Ticket interface
  public barcode: string;
  public reservationCode: string;
  private merchantNo: string; 
  public profile:any = [];
  public validation: string;
  public ticketPlaceholder:string = 'Enter Ticket No.';
  // Variables for getting payment
  private rateStr:any = [];
  private rate:string;  
  public amount:string;
  // Variables for applying payment    
  private paymentResp:any = [];
  public paymentSuccess:boolean = false;
  public merchantUpdated:any = [];
  private isReservation:boolean;
  private isRedeemed: boolean;
  private hasBalance: boolean = false; 
  public showReservationBox: boolean;
  public reservationMsg: string;

  constructor(private _profileService:ProfileService, private _ticketService:TicketService, private _bestParkingService: BestParkingService, private _route: ActivatedRoute) {
  }

  ngOnInit() {

    this.ticket = {
      ticketReservation: false,
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

      //let regTime = /stay = (\d+)/;
      //const time = this.rate.match(regTime);
      //console.log(time);

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

      let paymentAmt:number = parseInt(this.amount) * 100;
      paymentAmt = this._ticketService.resolveDiscount(this.validation, paymentAmt);
      console.log(paymentAmt);
    
      this._ticketService.applyPayment(this.barcode, this.merchantNo, paymentAmt).subscribe(rate => {
        this.paymentResp = JSON.parse(rate);
        console.log(this.paymentResp);
        this.paymentResp.statusText === 'OK' ? this.paymentSuccess = true : this.paymentSuccess = false;
            if(this.paymentSuccess === true) {
              console.log(this.paymentSuccess);
              this.updateMerchant(this.id, this.barcode, this.amount, this.validation);
            }
            return this.paymentSuccess;
      });
     
  }


  updateMerchant(_id, barcode, rate, validation) {
    this._ticketService.updateAccountTickets(_id, barcode, rate, validation).subscribe(updated => {
      this.merchantUpdated = updated;
    });    
  }
 

  hasReservation(model: Ticket) {
    this.isReservation = model.ticketReservation;
    return this.isReservation;
  }

  getReservation(model: Ticket, isValid: boolean) {
    let reservationCode = model.ticketNo;
    let currentTime = new Date(this._bestParkingService.getTimeStamp());
    this._bestParkingService.getReservations(reservationCode).subscribe(reservation => {
       let reserveTime = new Date(reservation.depart_dt)
       this.isRedeemed = reservation.redeemed;
       this.showReservationBox = true; 
       if(currentTime < reserveTime) {
          this.hasBalance === true;
          this.reservationMsg = 'Your are currently passed the reservation time and will incur the normal parking rate';
       } else {
          this.reservationMsg = 'You reservation has been paid.';
       }
    });
  }  



  getFacilities() {
    this._bestParkingService.getFacilities().subscribe(facilities => {
      console.log(facilities);
    });
  }

} // end ProfileComponent class