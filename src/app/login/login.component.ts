import { Component, OnInit } from '@angular/core';
import { loggedUser } from './login.interface';
import { LoginService } from '../shared/login.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { merchantClient } from '../../../server/models/merchant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css','./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup; // model driven form
  public loggedIn: boolean; // whether form has been submitted

  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {
     this.loginForm = new FormGroup({
     	username:new FormControl('', <any>Validators.required),
     	password:new FormControl('', <any>Validators.required)    
     });	
  }

  loginUser(model: merchantClient, isValid:boolean) {
    this.loggedIn = true;
    this._loginService.login(model).subscribe(data => {
      console.log(data._id);
      this._router.navigate(['/merchants']);
    }, error => {
      this.loggedIn = false;
      console.log('Returned '+this.loggedIn+'\n Error in loggging in '+error);
    });

  }

}