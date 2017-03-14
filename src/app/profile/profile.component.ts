import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { merchantClient } from '../../../server/models/merchant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../app.component.css']
})
export class ProfileComponent implements OnInit {

  private sub:any;
  private id:string;
  public profile:any = [];

  constructor(private _profileService:ProfileService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
       this.id = params['id'];
       console.log('Coming from login.service: '+this.id);
       this._profileService.getLoggedMerchant(this.id).subscribe(profile => {
       	this.profile = profile; 
       });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}