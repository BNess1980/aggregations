import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { loggedUser } from './login.interface';
import { NavigationService } from '../shared/navigation.service';
import { LoginService } from '../shared/login.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { merchantClient } from '../../../server/models/merchant';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css','./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup; // model driven form
  public loggedIn: boolean; // whether form has been submitted
  public errorMsg: string;
  data:any = [];
  account:string;

  constructor(private _loginService: LoginService, private http: Http, private _navService: NavigationService) {}

  ngOnInit() {
     this.loginForm = new FormGroup({
     	  username:new FormControl('', <any>Validators.required),
     	  password:new FormControl('', <any>Validators.required)    
     });	
  }

  loginUser(model: merchantClient, isValid:boolean) {
    this.loggedIn = true;
    this._loginService.login(model).subscribe(data => {
      this.data = data;
      console.log(data);
      // Update nav and remove login link
      this._navService.setAccountName(this.data.account);
      // Redirect to profile page
      this._loginService.redirectToMerchant(this.data._id);
    }, error => {
      this.loggedIn = false;
      console.log('Returned '+this.loggedIn+'\n Error in logging in '+error);
      return this.errorMsg = error;
    });

  }  

}