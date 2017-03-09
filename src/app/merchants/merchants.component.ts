import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from '../shared/merchants.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs/Rx';
import { merchantClient } from '../../../server/models/merchant';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css','../app.component.css']
})
export class MerchantsComponent implements OnInit {

  merchants:any = [];
  
  constructor(private merchantService: MerchantService, private _route:ActivatedRoute) { }

  ngOnInit() {

  	this.merchantService.getAllMerchants().subscribe(merchants => {
  		this.merchants = merchants;
  	});

  }
  
}