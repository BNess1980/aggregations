import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { TicketService } from '../shared/ticket.service';
import { BestParkingService } from '../shared/best-parking.service';
import { ParkWhizService } from '../shared/park-whiz.service';
import { SpotHeroService } from '../shared/spot-hero.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { merchantClient } from '../../../server/models/merchant';
import { Subscription } from 'rxjs/Rx';
import { Ticket } from './profile.interface';
import { SpotHeroBarcodePipe } from '../shared/spot-hero-barcode.pipe';

const moment = require('moment');

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
  private merchantNo: string; 
  public profile:any = [];
  public validation: string;
  public ticketPlaceholder:string = 'Enter Ticket No.';
  public buttonText = 'Get Reservation Info';
  // Variables for getting payment
  private rateStr:any = [];
  private rate:string;  
  public amount:string;
  // Variables for applying payment
  private paymentResp:any = [];
  public paymentSuccess:boolean = false;
  public merchantUpdated:any = [];
  private balance:number = 0;
  private hasBalance: boolean = false; 
  //Variables for Online Parking aggregators
  private isReservation:boolean;
  public reservationID:string;
  public showReservationBox: boolean = false;
  public reservationMsg: string;
  public aggregator:string = '';
  public aggregators:any = [];      
  private isRedeemed: boolean;
  private validateAggregator:boolean = false;
  private currentTime = moment().format();
  public spotHeroReservations:Array<any>;
  public spotHeroBarcode:string = ''; 

  constructor(private _profileService:ProfileService, private _ticketService:TicketService, private _bestParkingService: BestParkingService, private _parkWhizService: ParkWhizService, private _spotHeroService: SpotHeroService, private _route: ActivatedRoute) {
  }

  ngOnInit() {

    // time variable used for resolveTime() method;
    let currentTime = this.currentTime;

    // Ticket object matches profile.interface.ts
    this.ticket = {
      ticketReservation: false,
      ticketReservationNo: '',
      ticketValidation: '',
      ticketNo: '',
      ticketAmt: ''
    };

    // Gets all merchants from mongo database
    this.subscribe = this._route.params.subscribe(params => {
       this.id = params['id'];
       console.log('Coming from login.service: '+this.id);
       this._profileService.getLoggedMerchant(this.id).subscribe(profile => {
       	this.profile = profile;
        this.merchantNo = this.profile.merchant_number;
        return this.merchantNo;
       });
    });

    // Current Online Parking Aggregators
    this.aggregators = ['Best Parking','Park Whiz','SpotHero'];

    // SpotHero RSS feed of reservation updating on 1 second interval
    this._spotHeroService.getFeed().subscribe(obj => {
     console.log(obj.feed.entry);
     this.spotHeroReservations = obj.feed.entry;
    });

  } // End OnInit

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  } // End OnDestroy

  clearTicket() {
    this.paymentSuccess = false;
    this.amount = '';
    this.ngOnDestroy();
  }

  hasReservation(model: Ticket) {
    this.isReservation = model.ticketReservation;
    return this.isReservation;
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

      let paymentAmt:number;
      let reservationCredit:number = this.resolveBalance(this.balance); 
      let secomAmount:number = this.resolveAmount(this.amount);

      console.log('Is the reservation more than secom rack rate');
      console.log(reservationCredit > secomAmount);

      reservationCredit < secomAmount ? paymentAmt = reservationCredit : paymentAmt = secomAmount;

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

  resolveTime(currentTime:any, reservationEnd:any) {
    if(currentTime > reservationEnd) {
      return true;
    } else {
      return false;
    }
  }

  resolveAmount(amount:string){
    return parseInt(amount) * 100;
  }  

  resolveBalance(amount:number) {
    return parseInt((amount * 100).toFixed(2));
  }

  getAggregator(model: Ticket) {
    this.aggregator = model.ticketAggregator;
    console.log(this.aggregator);
    return this.aggregator;
  }

  getReservationBP(model: Ticket, isValid: boolean) {
    let reservationCode = model.ticketReservationNo;

    this.validateAggregator = true;
    this._bestParkingService.getReservations(reservationCode).subscribe(obj => {

       console.log(obj); 

       this.showReservationBox = true;
       this.balance = obj.reservation.fee;      
       this.reservationID = obj.id;

       let reserveTime = obj.reservation.depart_dt; 
       let reservationPast = this.resolveTime(this.currentTime,reserveTime);
       let redeemed = obj.reservation.redeemed;

       if(!redeemed && reservationPast) {
          this.hasBalance = true;
          this.isRedeemed = false;
          this.reservationMsg = 'Your are currently passed the reservation time and will incur the normal parking rate';
       } else if(!redeemed && !reservationPast) {
          this.hasBalance = true;
          this.isRedeemed = false;          
          this.reservationMsg = 'You current reservation credit is $'+this.balance;        
       } else if(redeemed && !reservationPast) {
          this.reservationMsg = 'Reservation has been redeemed and cannot be reused';     
       }

    });
  }

  updateReservationBP(model: Ticket, isValid: boolean) {
      this._bestParkingService.updateReservations(this.reservationID).subscribe(res => {
        console.log(res);
      });
      this.validateTicket();
  }  

  getReservationPW(model: Ticket, isValid: boolean) {
    let reservationCode = model.ticketReservationNo;
    this._parkWhizService.getReservations(reservationCode).subscribe(obj => {
      
      console.log(obj);

      this.validateAggregator = true;
      this.balance = obj.base_amount;
      this.reservationID = obj.id
      this.showReservationBox = true;

      let reserveTime = obj.utc_end;
      let status = obj.status;
      let reservationPast = this.resolveTime(this.currentTime,reserveTime);

      if(status === 'valid' && reservationPast) {
        this.reservationMsg = 'Your are currently passed the reservation time and will incur the normal parking rate';
        this.hasBalance = true;
        this.isRedeemed = false;        
      } else if(status === 'valid' && !reservationPast) {
        this.hasBalance = true;
        this.isRedeemed = false;        
        this.reservationMsg = 'You current reservation credit is $'+this.balance;           
      } else if(status === 'canceled') {
        this.reservationMsg = 'Reservation has been cancelled and cannot be reused';
      } else if(status === 'used') {
        this.reservationMsg = 'Reservation has been previously used';
      }
    });
  }  

  updateReservationPW(model: Ticket, isValid: boolean) {
      this._parkWhizService.updateReservations(this.reservationID).subscribe(res => {
        console.log(res);
        console.log('PW');
      });
      //this.validateTicket();
  }  

  // Sets pipe to find corresponding reservation
  filterReservationSH(model:Ticket, isValid:boolean) {
    console.log(model.ticketReservationNo);
    this.validateAggregator = true;
    this.spotHeroBarcode = model.ticketNo;    
  }

} // end ProfileComponent class