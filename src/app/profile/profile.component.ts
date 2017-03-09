import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { merchantClient } from '../../../server/models/merchant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _profileService:ProfileService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {

  }

}
