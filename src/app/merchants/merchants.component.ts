import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchantService } from '../shared/merchants.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs/Rx';
import { merchantClient } from '../../../server/models/merchant';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {

  private sub:any;
  public id:string;
  public test:string;
  merchants:any = [];
  
  constructor(private merchantService: MerchantService, private _route:ActivatedRoute) { }

  ngOnInit() {

    this.test = 'Testing';

    this.sub = this._route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       console.log(this.test)
       console.log(this.id)
    });

  	this.merchantService.getAllMerchants().subscribe(merchants => {
  		this.merchants = merchants;
  	});
  }


  

}
