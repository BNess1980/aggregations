import { Component, OnInit } from '@angular/core';
import { StatesService } from '../states.service';
import { RegisterService } from '../register.service';
import { ValidationsService } from '../validations.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { merchantClient } from '../../../server/models/merchant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css','./register.component.css']
})
export class RegisterComponent implements OnInit {

  public regForm: FormGroup; // model driven form
  public submitted: boolean; // whether form has been submitted
  public states:Object[] = []; // US States that prepoulate in dropdown
  private showRegMsg: boolean;

  constructor(private _statesService: StatesService, private _registerService: RegisterService, private _validationsService: ValidationsService, private _router: Router) {}

  ngOnInit() {

  	 // populate US States in formm
     this.states = this._statesService.getStates();

     let emailRegex = this._validationsService.regexEmail();

     this.regForm = new FormGroup({
     	account:new FormControl('', <any>Validators.required),
     	username:new FormControl('', <any>Validators.required),
     	password:new FormControl('', <any>Validators.required),    
     	street_address:new FormControl('', <any>Validators.required), 
     	city:new FormControl('', <any>Validators.required),
     	state:new FormControl('', <any>Validators.required),
      merchant_number:new FormControl('', <any>Validators.required), 
     	zip:new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]), 
     	phone:new FormControl('', <any>Validators.required), 
     	contact_name:new FormControl('', <any>Validators.required),
     	contact_email:new FormControl('', [<any>Validators.required, <any>Validators.pattern(emailRegex)])    	   	     	     	     	     	     	     	     	
     });

  }

  registerUser(model: merchantClient, isValid:boolean) {
  	 this.submitted = true;
     this.showRegMsg = true;
  	 console.log(model,isValid);
     this._registerService.registerMerchant(model);
     this._router.navigate(['/'])
  }

}