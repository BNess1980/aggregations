import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchants.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {

  merchants:any = [];

  constructor(private merchantService: MerchantService) { }

  ngOnInit() {
  	this.merchantService.getAllMerchants().subscribe(merchants => {
  		this.merchants = merchants;
  	});
  }

}
